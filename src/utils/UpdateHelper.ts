import {PowerDNS} from "../services/PowerDNS";
import {ZoneHelper} from "./ZoneHelper";

export class UpdateHelper {

    static async notifySlaves() {
        const servers = await PowerDNS.masterInstance.ServerEndpoint.servers();
        for (const server of servers) {
            const zones = await PowerDNS.masterInstance.ZoneEndpoint.listZones(server.id);
            for (const zone of zones) {
                await PowerDNS.masterInstance.ZoneEndpoint.sendDnsNotify(server.id, zone.id);
            }
        }
    }

    static async update() {
        await UpdateHelper.notifySlaves();
        await ZoneHelper.ensureDomainsExistsOnSlaves();
        await ZoneHelper.checkIfDomainsRemovable();
    }

}