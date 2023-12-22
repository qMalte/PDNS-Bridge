"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyController = void 0;
const PowerDNS_1 = require("../services/PowerDNS");
class KeyController {
    static getKeys(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id == null) {
                    return res.status(400).end();
                }
                const zoneId = req.params.id;
                const servers = yield PowerDNS_1.PowerDNS.masterInstance.ServerEndpoint.servers();
                if (servers.length === 0) {
                    return res.status(404).end();
                }
                const keys = yield PowerDNS_1.PowerDNS.masterInstance.CryptoKeyEndpoint.listCryptoKeys(servers[0].id, zoneId);
                return res.status(200).send(keys);
            }
            catch (e) {
                return res.status(500).end();
            }
        });
    }
    static PostKey(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.id == null) {
                    return res.status(400).end();
                }
                const zoneId = req.body.id;
                const servers = yield PowerDNS_1.PowerDNS.masterInstance.ServerEndpoint.servers();
                if (servers.length === 0) {
                    return res.status(404).end();
                }
                const zone = yield PowerDNS_1.PowerDNS.masterInstance.ZoneEndpoint.getZone(servers[0].id, zoneId);
                if (zone.dnssec) {
                    return res.status(400).end();
                }
                zone.dnssec = true;
                const query = yield PowerDNS_1.PowerDNS.masterInstance.ZoneEndpoint.modifyBasicZone(servers[0].id, zoneId, zone);
                const keys = yield PowerDNS_1.PowerDNS.masterInstance.CryptoKeyEndpoint.listCryptoKeys(servers[0].id, zoneId);
                return res.status(query ? 200 : 500).send(keys.length > 0 ? keys[0] : null);
            }
            catch (e) {
                return res.status(500).end();
            }
        });
    }
    static DeleteKeys(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id == null) {
                    return res.status(400).end();
                }
                const zoneId = req.params.id;
                const servers = yield PowerDNS_1.PowerDNS.masterInstance.ServerEndpoint.servers();
                if (servers.length === 0) {
                    return res.status(404).end();
                }
                const zone = yield PowerDNS_1.PowerDNS.masterInstance.ZoneEndpoint.getZone(servers[0].id, zoneId);
                if (!zone.dnssec) {
                    return res.status(400).end();
                }
                zone.dnssec = false;
                const query = yield PowerDNS_1.PowerDNS.masterInstance.ZoneEndpoint.modifyBasicZone(servers[0].id, zoneId, zone);
                return res.status(query ? 200 : 500).end();
            }
            catch (e) {
                return res.status(500).end();
            }
        });
    }
}
exports.KeyController = KeyController;
//# sourceMappingURL=KeyController.js.map