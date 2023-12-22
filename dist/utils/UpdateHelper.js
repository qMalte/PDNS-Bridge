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
exports.UpdateHelper = void 0;
const PowerDNS_1 = require("../services/PowerDNS");
const ZoneHelper_1 = require("./ZoneHelper");
class UpdateHelper {
    static notifySlaves() {
        return __awaiter(this, void 0, void 0, function* () {
            const servers = yield PowerDNS_1.PowerDNS.masterInstance.ServerEndpoint.servers();
            for (const server of servers) {
                const zones = yield PowerDNS_1.PowerDNS.masterInstance.ZoneEndpoint.listZones(server.id);
                for (const zone of zones) {
                    yield PowerDNS_1.PowerDNS.masterInstance.ZoneEndpoint.sendDnsNotify(server.id, zone.id);
                }
            }
        });
    }
    static update() {
        return __awaiter(this, void 0, void 0, function* () {
            yield UpdateHelper.notifySlaves();
            yield ZoneHelper_1.ZoneHelper.ensureDomainsExistsOnSlaves();
            yield ZoneHelper_1.ZoneHelper.checkIfDomainsRemovable();
        });
    }
}
exports.UpdateHelper = UpdateHelper;
//# sourceMappingURL=UpdateHelper.js.map