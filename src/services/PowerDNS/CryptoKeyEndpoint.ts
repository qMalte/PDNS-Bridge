import { PowerDNS } from "../PowerDNS";
import superagent from "superagent";
import {Cryptokey} from "../../models/PowerDNSModels/Cryptokey";

export class CryptoKeyEndpoint {

    constructor(private core: PowerDNS) {
        //
    }

    async listCryptoKeys(serverId: string, zoneId: string): Promise<Cryptokey[]> {
        try {
            const query = await superagent
                .get(`${this.core.url}/servers/${serverId}/zones/${zoneId}/cryptokeys`)
                .set(this.core.apiKey);
            return query.ok ? query.body : null;
        } catch (e) {
            return null;
        }
    }

    async createCryptoKey(serverId: string, zoneId: string, content?: string, bits?: number, algo?: string): Promise<Cryptokey> {
        try {
            const query = await superagent
                .post(`${this.core.url}/servers/${serverId}/zones/${zoneId}/cryptokeys`)
                .send({
                    type: "Cryptokey",
                    keytype: "csk",
                    content,
                    bits,
                    algo
                })
                .set(this.core.apiKey);
            return query.ok ? query.body : null;
        } catch (e) {
            return null;
        }
    }

    async getCryptoKey(serverId: string, zoneId: string, cryptoKeyId: string): Promise<Cryptokey> {
        try {
            const query = await superagent
                .get(`${this.core.url}/servers/${serverId}/zones/${zoneId}/cryptokeys/${cryptoKeyId}`)
                .set(this.core.apiKey);
            return query.ok ? query.body : null;
        } catch (e) {
            return null;
        }
    }

    async manipulateCryptoKey(serverId: string, zoneId: string, cryptoKeyId: string, active: boolean) {
        try {
            const query = await superagent
                .put(`${this.core.url}/servers/${serverId}/zones/${zoneId}/cryptokeys/${cryptoKeyId}`)
                .send({ active })
                .set(this.core.apiKey);
            return query.ok;
        } catch (e) {
            return null;
        }
    }

    async deleteCryptoKey(serverId: string, zoneId: string, cryptoKeyId: number) {
        try {
            const query = await superagent
                .delete(`${this.core.url}/servers/${serverId}/zones/${zoneId}/cryptokeys/${cryptoKeyId}`)
                .set(this.core.apiKey);
            return query.ok;
        } catch (e) {
            return null;
        }
    }
}
