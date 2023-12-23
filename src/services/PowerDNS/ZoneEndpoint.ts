import { PowerDNS } from "../PowerDNS";
import superagent from "superagent";
import {Server} from "../../models/PowerDNSModels/Server";
import {Zone} from "../../models/PowerDNSModels/Zone";

export class ZoneEndpoint {

    constructor(private core: PowerDNS) {
        //
    }

    async listZones(serverId: string, zoneName?: string, includeDnssec: boolean = true): Promise<Zone[]> {
        try {
            const query = await superagent
                .get(`${this.core.url}/servers/${serverId}/zones`)
                .query({ zone: zoneName, dnssec: includeDnssec })
                .set(this.core.apiKey);
            return query.ok ? query.body : null;
        } catch (e) {
            return null;
        }
    }

    async createZone(serverId: string, zone: Zone, includeRrsets: boolean = true): Promise<Zone> {
        try {
            const query = await superagent
                .post(`${this.core.url}/servers/${serverId}/zones`)
                .send(zone)
                .query({ rrsets: includeRrsets })
                .set(this.core.apiKey);
            return query.ok ? query.body : null;
        } catch (e) {
            return null;
        }
    }

    async getZone(serverId: string, zoneId: string, includeRrsets: boolean = true, rrsetName?: string, rrsetType?: string): Promise<Zone> {
        try {
            const query = await superagent
                .get(`${this.core.url}/servers/${serverId}/zones/${zoneId}`)
                .query({ rrsets: includeRrsets, rrset_name: rrsetName, rrset_type: rrsetType })
                .set(this.core.apiKey);
            return query.ok ? query.body : null;
        } catch (e) {
            return null;
        }
    }

    async deleteZone(serverId: string, zoneId: string) {
        try {
            const query = await superagent
                .delete(`${this.core.url}/servers/${serverId}/zones/${zoneId}`)
                .set(this.core.apiKey);
            return query.ok;
        } catch (e) {
            return false;
        }
    }

    async modifyZone(serverId: string, zoneId: string, zone: Zone) {
        try {
            const query = await superagent
                .patch(`${this.core.url}/servers/${serverId}/zones/${zoneId}`)
                .send(zone)
                .set(this.core.apiKey);
            return query.ok;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async modifyBasicZone(serverId: string, zoneId: string, zone: Zone) {
        try {
            const query = await superagent
                .put(`${this.core.url}/servers/${serverId}/zones/${zoneId}`)
                .send(zone)
                .set(this.core.apiKey);
            return query.ok;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async retrieveSlaveZone(serverId: string, zoneId: string) {
        try {
            const query = await superagent
                .put(`${this.core.url}/servers/${serverId}/zones/${zoneId}/axfr-retrieve`)
                .set(this.core.apiKey);
            return query.ok;
        } catch (e) {
            return false;
        }
    }

    async sendDnsNotify(serverId: string, zoneId: string) {
        try {
            const query = await superagent
                .put(`${this.core.url}/servers/${serverId}/zones/${zoneId}/notify`)
                .set(this.core.apiKey);
            return query.ok;
        } catch (e) {
            return false;
        }
    }

    async exportZone(serverId: string, zoneId: string) {
        try {
            const query = await superagent
                .get(`${this.core.url}/servers/${serverId}/zones/${zoneId}/export`)
                .set(this.core.apiKey);
            return query.ok ? query.text : null;
        } catch (e) {
            return null;
        }
    }

    async rectifyZone(serverId: string, zoneId: string) {
        try {
            const query = await superagent
                .put(`${this.core.url}/servers/${serverId}/zones/${zoneId}/rectify`)
                .set(this.core.apiKey);
            return query.ok ? query.text : null;
        } catch (e) {
            return null;
        }
    }
}
