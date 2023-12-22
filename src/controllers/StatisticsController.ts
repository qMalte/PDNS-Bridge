import { Request, Response } from 'express';
import {PowerDNS} from "../services/PowerDNS";
import {Zone} from "../models/PowerDNSModels/Zone";
import {UpdateHelper} from "../utils/UpdateHelper";
import {ZoneHelper} from "../utils/ZoneHelper";

export class StatisticsController {

    static async getStatistics(req: Request, res: Response) {
        try {

            const servers = await PowerDNS.masterInstance.ServerEndpoint.servers();

            if (servers.length === 0) {
                return res.status(404).end();
            }

            const stats = await PowerDNS.masterInstance.StatisticEndpoint.queryStatistics(servers[0].id);
            return res.status(200).send(stats);

        } catch (e) {
            return res.status(500).end();
        }
    }

}