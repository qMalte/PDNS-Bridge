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
exports.StatisticsController = void 0;
const PowerDNS_1 = require("../services/PowerDNS");
class StatisticsController {
    static getStatistics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const servers = yield PowerDNS_1.PowerDNS.masterInstance.ServerEndpoint.servers();
                if (servers.length === 0) {
                    return res.status(404).end();
                }
                const stats = yield PowerDNS_1.PowerDNS.masterInstance.StatisticEndpoint.queryStatistics(servers[0].id);
                return res.status(200).send(stats);
            }
            catch (e) {
                return res.status(500).end();
            }
        });
    }
}
exports.StatisticsController = StatisticsController;
//# sourceMappingURL=StatisticsController.js.map