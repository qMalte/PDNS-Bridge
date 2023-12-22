import {PowerDNS} from "../services/PowerDNS";
import process from "process";
import {Record} from "../models/PowerDNSModels/Record";
import {RRSet} from "../models/PowerDNSModels/RRSet";
import {Server} from "../models/PowerDNSModels/Server";
import {Zone} from "../models/PowerDNSModels/Zone";
import dotenv from "dotenv";

export class ZoneHelper {

    static async ensureDomainsExistsOnSlaves() {
        const servers = await PowerDNS.masterInstance.ServerEndpoint.servers();
        for (const server of servers) {
            const zones = await PowerDNS.masterInstance.ZoneEndpoint.listZones(server.id);
            for (const zone of zones) {
                for (const slave of PowerDNS.slaveInstances) {
                    const slaveZones = await slave.ZoneEndpoint.listZones(server.id);
                    if (!slaveZones.find((slaveZone) => slaveZone.name === zone.name)) {
                        zone.kind = "Slave";
                        zone.masters = [PowerDNS.masterInstance.host];
                        await slave.ZoneEndpoint.createZone(server.id, zone);
                    }
                }
            }
        }
    }

    static async ensureNameServerRecordsExists(zone: Zone, server: Server) {
        dotenv.config();
        const nameservers = process.env.NAMESERVERS?.split(',') ?? [];
        const nameserverRecords: Record[] = [];

        nameservers.forEach((nameserver) => {
           nameserverRecords.push({
                content: nameserver + '.',
                disabled: false
           })
        });

        let nameserverOk = true;
        for (const record of zone.rrsets) {
            if (record.type.toLowerCase() == 'ns') {
                for (const r of record.records) {
                    if (!nameservers.find(x => x === r.content)) {
                        nameserverOk = false;
                    }
                }
            }
        }
        const numberOfNameservers = zone.rrsets.find(x => x.type.toLowerCase() == 'ns')?.records.length ?? 0;
        if (!nameserverOk || numberOfNameservers != nameservers.length) {
            console.log(`Zone ${zone.name} is missing nameservers.`);
            const nsRecord: RRSet = {
                name: zone.name,
                type: 'NS',
                changetype: 'REPLACE',
                ttl: 3600,
                records: nameserverRecords
            }
            zone.rrsets = zone.rrsets.filter(x => x.type.toLowerCase() != 'ns');
            zone.rrsets.push(nsRecord);
            zone.rrsets.map(x => x.changetype = 'REPLACE');
            await PowerDNS.masterInstance.ZoneEndpoint.modifyZone(server.id, zone.id, zone);
        }
    }

    static async checkIfDomainsRemovable() {
        for (const slave of PowerDNS.slaveInstances) {
            const servers = await PowerDNS.masterInstance.ServerEndpoint.servers();
            for (const server of servers) {
                const zones = await slave.ZoneEndpoint.listZones(server.id);
                for (const zone of zones) {
                    const masterZones = await PowerDNS.masterInstance.ZoneEndpoint.listZones(server.id);
                    if (masterZones != null && masterZones.length > 0 && !masterZones.find((z) => z.name === zone.name)) {
                        console.log(`Zone ${zone.name} is not present on master, but on slave ${slave.url}.`);
                        await slave.ZoneEndpoint.deleteZone(server.id, zone.id);
                    }
                }
            }
        }
    }

}