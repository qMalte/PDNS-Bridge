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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneHelper = void 0;
const PowerDNS_1 = require("../services/PowerDNS");
const process_1 = __importDefault(require("process"));
const dotenv_1 = __importDefault(require("dotenv"));
class ZoneHelper {
    static ensureDomainsExistsOnSlaves() {
        return __awaiter(this, void 0, void 0, function* () {
            const servers = yield PowerDNS_1.PowerDNS.masterInstance.ServerEndpoint.servers();
            for (const server of servers) {
                const zones = yield PowerDNS_1.PowerDNS.masterInstance.ZoneEndpoint.listZones(server.id);
                for (const zone of zones) {
                    for (const slave of PowerDNS_1.PowerDNS.slaveInstances) {
                        const slaveZones = yield slave.ZoneEndpoint.listZones(server.id);
                        if (!slaveZones.find((slaveZone) => slaveZone.name === zone.name)) {
                            zone.kind = "Slave";
                            zone.masters = [PowerDNS_1.PowerDNS.masterInstance.host];
                            yield slave.ZoneEndpoint.createZone(server.id, zone);
                        }
                    }
                }
            }
        });
    }
    static ensureNameServerRecordsExists(zone, server) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            dotenv_1.default.config();
            const nameservers = (_b = (_a = process_1.default.env.NAMESERVERS) === null || _a === void 0 ? void 0 : _a.split(',')) !== null && _b !== void 0 ? _b : [];
            const nameserverRecords = [];
            nameservers.forEach((nameserver) => {
                nameserverRecords.push({
                    content: nameserver + '.',
                    disabled: false
                });
            });
            let nameserverOk = true;
            for (const record of zone.rrsets) {
                if (record.type.toLowerCase() == 'ns') {
                    for (const r of record.records) {
                        if (!nameservers.find(x => x === r.content)) {
                            nameserverOk = false;
                        }
                    }
                }
            }
            const numberOfNameservers = (_d = (_c = zone.rrsets.find(x => x.type.toLowerCase() == 'ns')) === null || _c === void 0 ? void 0 : _c.records.length) !== null && _d !== void 0 ? _d : 0;
            if (!nameserverOk || numberOfNameservers != nameservers.length) {
                console.log(`Zone ${zone.name} is missing nameservers.`);
                const nsRecord = {
                    name: zone.name,
                    type: 'NS',
                    changetype: 'REPLACE',
                    ttl: 3600,
                    records: nameserverRecords
                };
                zone.rrsets = zone.rrsets.filter(x => x.type.toLowerCase() != 'ns');
                zone.rrsets.push(nsRecord);
                zone.rrsets.map(x => x.changetype = 'REPLACE');
                yield PowerDNS_1.PowerDNS.masterInstance.ZoneEndpoint.modifyZone(server.id, zone.id, zone);
            }
        });
    }
    static checkIfDomainsRemovable() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const slave of PowerDNS_1.PowerDNS.slaveInstances) {
                const servers = yield PowerDNS_1.PowerDNS.masterInstance.ServerEndpoint.servers();
                for (const server of servers) {
                    const zones = yield slave.ZoneEndpoint.listZones(server.id);
                    for (const zone of zones) {
                        const masterZones = yield PowerDNS_1.PowerDNS.masterInstance.ZoneEndpoint.listZones(server.id);
                        if (masterZones != null && masterZones.length > 0 && !masterZones.find((z) => z.name === zone.name)) {
                            console.log(`Zone ${zone.name} is not present on master, but on slave ${slave.url}.`);
                            yield slave.ZoneEndpoint.deleteZone(server.id, zone.id);
                        }
                    }
                }
            }
        });
    }
    static generateSerial() {
        return Math.floor(Date.now() / 1000);
    }
    static updateSOA(zoneId) {
        return __awaiter(this, void 0, void 0, function* () {
            const servers = yield PowerDNS_1.PowerDNS.masterInstance.ServerEndpoint.servers();
            for (const server of servers) {
                const zone = yield PowerDNS_1.PowerDNS.masterInstance.ZoneEndpoint.getZone(server.id, zoneId);
                const soa = this.generateSOA(zone);
                const soaRecord = zone.rrsets.find(x => x.type.toLowerCase() == 'soa');
                if (soaRecord != null) {
                    soaRecord.records = soa.records;
                    soaRecord.ttl = soa.ttl;
                    soaRecord.changetype = 'REPLACE';
                }
                else {
                    zone.rrsets.push(soa);
                }
                zone.rrsets.map(x => x.changetype = 'REPLACE');
                yield PowerDNS_1.PowerDNS.masterInstance.ZoneEndpoint.modifyZone(server.id, zone.id, zone);
            }
        });
    }
    static generateSOA(zone) {
        var _a, _b;
        dotenv_1.default.config();
        const nameservers = (_b = (_a = process_1.default.env.NAMESERVERS) === null || _a === void 0 ? void 0 : _a.split(',')) !== null && _b !== void 0 ? _b : [];
        const soa = {
            name: zone.name,
            type: 'SOA',
            changetype: 'REPLACE',
            ttl: 3600,
            records: [
                {
                    content: `${nameservers[0]}. hostmaster.centralnode.net. ${this.generateSerial()} 10800 3600 604800 3600`,
                    disabled: false
                }
            ]
        };
        return soa;
    }
}
exports.ZoneHelper = ZoneHelper;
//# sourceMappingURL=ZoneHelper.js.map