import { Request, Response } from 'express';
import {PowerDNS} from "../services/PowerDNS";
import {Zone} from "../models/PowerDNSModels/Zone";
import {UpdateHelper} from "../utils/UpdateHelper";
import {ZoneHelper} from "../utils/ZoneHelper";
import {EntityRegistry} from "typeauthx/lib/database";
import {UserService} from "typeauthx/lib/services/UserService";

export class UserController {

    static async getUserWithAddresses(req: Request, res: Response) {
        try {

            const users = await EntityRegistry.User.find();
            const mailAddresses: string[] = [];

            users.forEach(user => {
                mailAddresses.push(user.email);
            });

            return res.status(200).send(mailAddresses);

        } catch (e) {
            return res.status(500).end();
        }
    }

}