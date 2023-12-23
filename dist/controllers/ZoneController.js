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
exports.ZoneController = void 0;
const PowerDNS_1 = require("../services/PowerDNS");
const UpdateHelper_1 = require("../utils/UpdateHelper");
const ZoneHelper_1 = require("../utils/ZoneHelper");
class ZoneController {
    static getZone(req, res) {
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
                return res.status(200).send(zone);
            }
            catch (e) {
                return res.status(500).end();
            }
        });
    }
    static getZones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const servers = yield PowerDNS_1.PowerDNS.masterInstance.ServerEndpoint.servers();
                if (servers.length === 0) {
                    return res.status(404).end();
                }
                const zones = yield PowerDNS_1.PowerDNS.masterInstance.ZoneEndpoint.listZones(servers[0].id);
                return res.status(200).send(zones);
            }
            catch (e) {
                return res.status(500).end();
            }
        });
    }
    static postZone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body == null) {
                    return res.status(400).end();
                }
                const zone = req.body;
                const servers = yield PowerDNS_1.PowerDNS.masterInstance.ServerEndpoint.servers();
                if (servers.length === 0) {
                    return res.status(404).end();
                }
                zone.serial = ZoneHelper_1.ZoneHelper.generateSerial();
                res = (yield PowerDNS_1.PowerDNS.masterInstance.ZoneEndpoint.createZone(servers[0].id, zone))
                    ? res.status(200)
                    : res.status(500);
                if (res) {
                    yield ZoneHelper_1.ZoneHelper.ensureNameServerRecordsExists(zone, servers[0]);
                }
                UpdateHelper_1.UpdateHelper.update().then();
                return res.end();
            }
            catch (e) {
                return res.status(500).end();
            }
        });
    }
    static patchZone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body == null) {
                    return res.status(400).end();
                }
                const zone = req.body;
                const servers = yield PowerDNS_1.PowerDNS.masterInstance.ServerEndpoint.servers();
                if (servers.length === 0) {
                    return res.status(404).end();
                }
                res = (yield PowerDNS_1.PowerDNS.masterInstance.ZoneEndpoint.modifyZone(servers[0].id, zone.id, zone))
                    ? res.status(200)
                    : res.status(500);
                yield ZoneHelper_1.ZoneHelper.updateSOA(zone.id);
                UpdateHelper_1.UpdateHelper.update().then();
                return res.end();
            }
            catch (e) {
                return res.status(500).end();
            }
        });
    }
    static deleteZone(req, res) {
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
                res = (yield PowerDNS_1.PowerDNS.masterInstance.ZoneEndpoint.deleteZone(servers[0].id, zoneId))
                    ? res.status(200)
                    : res.status(500);
                yield UpdateHelper_1.UpdateHelper.update();
                return res.end();
            }
            catch (e) {
                return res.status(500).end();
            }
        });
    }
}
exports.ZoneController = ZoneController;
//# sourceMappingURL=ZoneController.js.map