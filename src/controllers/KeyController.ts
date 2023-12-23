import { Request, Response } from 'express';
import {PowerDNS} from "../services/PowerDNS";
import {Zone} from "../models/PowerDNSModels/Zone";
import {UpdateHelper} from "../utils/UpdateHelper";
import {ZoneHelper} from "../utils/ZoneHelper";

export class KeyController {

    static async getKeys(req: Request, res: Response) {
        try {

            if (req.params.id == null) {
                return res.status(400).end();
            }

            const zoneId = req.params.id;

            const servers = await PowerDNS.masterInstance.ServerEndpoint.servers();

            if (servers.length === 0) {
                return res.status(404).end();
            }

            const keys = await PowerDNS.masterInstance.CryptoKeyEndpoint.listCryptoKeys(servers[0].id, zoneId);
            return res.status(200).send(keys);

        } catch (e) {
            return res.status(500).end();
        }
    }

    static async PostKey(req: Request, res: Response) {
        try {

            if (req.body.id == null) {
                return res.status(400).end();
            }

            const zoneId = req.body.id;

            const servers = await PowerDNS.masterInstance.ServerEndpoint.servers();

            if (servers.length === 0) {
                return res.status(404).end();
            }

            const zone = await PowerDNS.masterInstance.ZoneEndpoint.getZone(servers[0].id, zoneId);

            if (zone.dnssec) {
                return res.status(400).end();
            }

            zone.dnssec = true;
            const query = await PowerDNS.masterInstance.ZoneEndpoint.modifyBasicZone(servers[0].id, zoneId, zone);
            const keys = await PowerDNS.masterInstance.CryptoKeyEndpoint.listCryptoKeys(servers[0].id, zoneId);

            if (query) {
                UpdateHelper.update().then();
            }

            return res.status(query ? 200 : 500).send(keys.length > 0 ? keys[0] : null);

        } catch (e) {
            return res.status(500).end();
        }
    }

    static async DeleteKeys(req: Request, res: Response) {
        try {

            if (req.params.id == null) {
                return res.status(400).end();
            }

            const zoneId = req.params.id;

            const servers = await PowerDNS.masterInstance.ServerEndpoint.servers();

            if (servers.length === 0) {
                return res.status(404).end();
            }

            const zone = await PowerDNS.masterInstance.ZoneEndpoint.getZone(servers[0].id, zoneId);

            if (!zone.dnssec) {
                return res.status(400).end();
            }

            zone.dnssec = false;
            const query = await PowerDNS.masterInstance.ZoneEndpoint.modifyBasicZone(servers[0].id, zoneId, zone);

            if (query) {
                UpdateHelper.update().then();
            }

            return res.status(query ? 200 : 500).end();

        } catch (e) {
            return res.status(500).end();
        }
    }

}