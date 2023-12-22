import { PowerDNS } from "../PowerDNS";
import superagent from "superagent";
import {Cryptokey} from "../../models/PowerDNSModels/Cryptokey";
import {Metadata} from "../../models/PowerDNSModels/Metadata";

export class MetadataEndpoint {

    constructor(private core: PowerDNS) {
        //
    }

    async getZoneMetadata(serverId: string, zoneId: string): Promise<Metadata[]> {
        try {
            const query = await superagent
                .get(`${this.core.url}/servers/${serverId}/zones/${zoneId}/metadata`)
                .set(this.core.apiKey);
            return query.ok ? query.body : null;
        } catch (e) {
            return null;
        }
    }

    async createZoneMetadata(serverId: string, zoneId: string, metadata: any) {
        try {
            const query = await superagent
                .post(`${this.core.url}/servers/${serverId}/zones/${zoneId}/metadata`)
                .send(metadata)
                .set(this.core.apiKey);
            return query.ok;
        } catch (e) {
            return false;
        }
    }

    async getMetadataByKind(serverId: string, zoneId: string, metadataKind: string): Promise<Metadata> {
        try {
            const query = await superagent
                .get(`${this.core.url}/servers/${serverId}/zones/${zoneId}/metadata/${metadataKind}`)
                .set(this.core.apiKey);
            return query.ok ? query.body : null;
        } catch (e) {
            return null;
        }
    }

    async replaceMetadataByKind(serverId: string, zoneId: string, metadataKind: string, metadata: any): Promise<Metadata> {
        try {
            const query = await superagent
                .put(`${this.core.url}/servers/${serverId}/zones/${zoneId}/metadata/${metadataKind}`)
                .send(metadata)
                .set(this.core.apiKey);
            return query.ok ? query.body : null;
        } catch (e) {
            return null;
        }
    }

    async deleteMetadataByKind(serverId: string, zoneId: string, metadataKind: string) {
        try {
            const query = await superagent
                .delete(`${this.core.url}/servers/${serverId}/zones/${zoneId}/metadata/${metadataKind}`)
                .set(this.core.apiKey);
            return query.ok;
        } catch (e) {
            return false;
        }
    }
}
