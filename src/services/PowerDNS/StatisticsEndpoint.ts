import { PowerDNS } from "../PowerDNS";
import superagent from "superagent";
import {Server} from "../../models/PowerDNSModels/Server";
import {StatisticItem} from "../../models/PowerDNSModels/Statistic";

export class StatisticsEndpoint {

    constructor(private core: PowerDNS) {
        //
    }

    async queryStatistics(serverId: string, statisticName?: string, includeRings: boolean = true): Promise<StatisticItem[]> {
        try {
            const query = await superagent
                .get(`${this.core.url}/servers/${serverId}/statistics`)
                .query({ statistic: statisticName, includerings: includeRings })
                .set(this.core.apiKey);
            return query.ok ? query.body : null;
        } catch (e) {
            return null;
        }
    }
}
