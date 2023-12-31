import { Request, Response } from 'express';
import {PowerDNS} from "../services/PowerDNS";
import {Zone} from "../models/PowerDNSModels/Zone";
import {UpdateHelper} from "../utils/UpdateHelper";
import {ZoneHelper} from "../utils/ZoneHelper";
import {EntityRegistry} from "typeauthx/lib/database";
import {UserService} from "typeauthx/lib/services/UserService";

export class ZoneController {

    static async getZone(req: Request, res: Response) {
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

            if (res.locals.user_id != null) {
                const user = await EntityRegistry.User.findOneBy({id: res.locals.user_id});
                if (user == null) {
                    return res.status(400).end();
                }
                if (zone == null || zone.account.toLowerCase() != user.email.toLowerCase()) {
                    return res.status(403).end();
                }
            }

            return res.status(200).send(zone);

        } catch (e) {
            return res.status(500).end();
        }
    }

    static async getZones(req: Request, res: Response) {
        try {
            const servers = await PowerDNS.masterInstance.ServerEndpoint.servers();

            if (servers.length === 0) {
                return res.status(404).end();
            }

            let zones = await PowerDNS.masterInstance.ZoneEndpoint.listZones(servers[0].id);

            if (res.locals.user_id != null) {
                const user = await EntityRegistry.User.findOneBy({id: res.locals.user_id});
                if (user == null) {
                    return res.status(400).end();
                }
                zones = zones.filter(z => z.account.toLowerCase() == user.email.toLowerCase());
            }

            return res.status(200).send(zones);

        } catch (e) {
            return res.status(500).end();
        }
    }

    static async postZone(req: Request, res: Response) {
        try {

            if (req.body == null) {
                return res.status(400).end();
            }

            const zone: Zone = req.body;

            const servers = await PowerDNS.masterInstance.ServerEndpoint.servers();

            if (servers.length === 0) {
                return res.status(404).end();
            }

            zone.serial = ZoneHelper.generateSerial();
            zone.soa_edit_api = 'DEFAULT';
            zone.api_rectify = true;

            if (res.locals.user_id != null) {
                const user = await EntityRegistry.User.findOneBy({id: res.locals.user_id});
                if (user == null) {
                    return res.status(400).end();
                }
                zone.account = user.email;
            }

            res = await PowerDNS.masterInstance.ZoneEndpoint.createZone(servers[0].id, zone)
                ? res.status(200)
                : res.status(500);

            if (res) {
                await ZoneHelper.ensureNameServerRecordsExists(zone, servers[0]);
            }

            UpdateHelper.update().then();

            return res.end();

        } catch (e) {
            return res.status(500).end();
        }
    }

    static async patchZone(req: Request, res: Response) {
        try {

            if (req.body == null) {
                return res.status(400).end();
            }

            const zone: Zone = req.body;

            const servers = await PowerDNS.masterInstance.ServerEndpoint.servers();

            if (servers.length === 0) {
                return res.status(404).end();
            }

            zone.rrsets = zone.rrsets.filter(r => r.type != null && r.type !== '');

            if (res.locals.user_id != null) {
                const user = await EntityRegistry.User.findOneBy({id: res.locals.user_id});
                if (user == null) {
                    return res.status(400).end();
                }
                if (zone.account.toLowerCase() != user.email.toLowerCase()) {
                    return res.status(403).end();
                }
            }

            res = await PowerDNS.masterInstance.ZoneEndpoint.modifyZone(servers[0].id, zone.id, zone)
                ? res.status(200)
                : res.status(500);

            UpdateHelper.update().then();

            return res.end();

        } catch (e) {
            return res.status(500).end();
        }
    }

    static async patchBasicZone(req: Request, res: Response) {
        try {

            if (req.body == null) {
                return res.status(400).end();
            }

            const zone: Zone = req.body;

            const servers = await PowerDNS.masterInstance.ServerEndpoint.servers();

            if (servers.length === 0) {
                return res.status(404).end();
            }

            if (res.locals.user_id != null) {
                const user = await EntityRegistry.User.findOneBy({id: res.locals.user_id});
                if (user == null) {
                    return res.status(400).end();
                }
                if (zone.account.toLowerCase() != user.email.toLowerCase()) {
                    return res.status(403).end();
                }
            }

            res = await PowerDNS.masterInstance.ZoneEndpoint.modifyBasicZone(servers[0].id, zone.id, zone)
                ? res.status(200)
                : res.status(500);

            UpdateHelper.update().then();

            return res.end();

        } catch (e) {
            return res.status(500).end();
        }
    }

    static async deleteZone(req: Request, res: Response) {
        try {

            if (req.params.id == null) {
                return res.status(400).end();
            }

            const zoneId = req.params.id;

            const servers = await PowerDNS.masterInstance.ServerEndpoint.servers();

            if (servers.length === 0) {
                return res.status(404).end();
            }

            if (res.locals.user_id != null) {
                const user = await EntityRegistry.User.findOneBy({id: res.locals.user_id});
                if (user == null) {
                    return res.status(400).end();
                }
                const zone = await PowerDNS.masterInstance.ZoneEndpoint.getZone(servers[0].id, zoneId);
                if (zone == null || zone.account.toLowerCase() != user.email.toLowerCase()) {
                    return res.status(403).end();
                }
            }

            res = await PowerDNS.masterInstance.ZoneEndpoint.deleteZone(servers[0].id, zoneId)
                ? res.status(200)
                : res.status(500);

            await UpdateHelper.update();

            return res.end();

        } catch (e) {
            return res.status(500).end();
        }
    }

}