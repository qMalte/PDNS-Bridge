import {PowerDNS} from "../PowerDNS";
import superagent from "superagent";
import {Metadata} from "../../models/PowerDNSModels/Metadata";
import {Server} from "../../models/PowerDNSModels/Server";

export class ServerEndpoint {

    constructor(private core: PowerDNS) {
        //
    }

    async servers(): Promise<Server[]> {
        try {
            const query = await superagent
                .get(`${this.core.url}/servers`)
                .set(this.core.apiKey);
            return query.ok ? query.body : null;
        } catch (e) {
            return null;
        }
    }

    async server(id: string): Promise<Server> {
        try {
            const query = await superagent
                .get(`${this.core.url}/servers/${id}`)
                .set(this.core.apiKey);
            return query.ok ? query.body : null;
        } catch (e) {
            return null;
        }
    }

}