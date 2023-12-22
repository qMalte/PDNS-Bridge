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
exports.ZoneEndpoint = void 0;
const superagent_1 = __importDefault(require("superagent"));
class ZoneEndpoint {
    constructor(core) {
        this.core = core;
        //
    }
    listZones(serverId, zoneName, includeDnssec = true) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield superagent_1.default
                    .get(`${this.core.url}/servers/${serverId}/zones`)
                    .query({ zone: zoneName, dnssec: includeDnssec })
                    .set(this.core.apiKey);
                return query.ok ? query.body : null;
            }
            catch (e) {
                return null;
            }
        });
    }
    createZone(serverId, zone, includeRrsets = true) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield superagent_1.default
                    .post(`${this.core.url}/servers/${serverId}/zones`)
                    .send(zone)
                    .query({ rrsets: includeRrsets })
                    .set(this.core.apiKey);
                return query.ok ? query.body : null;
            }
            catch (e) {
                return null;
            }
        });
    }
    getZone(serverId, zoneId, includeRrsets = true, rrsetName, rrsetType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield superagent_1.default
                    .get(`${this.core.url}/servers/${serverId}/zones/${zoneId}`)
                    .query({ rrsets: includeRrsets, rrset_name: rrsetName, rrset_type: rrsetType })
                    .set(this.core.apiKey);
                return query.ok ? query.body : null;
            }
            catch (e) {
                return null;
            }
        });
    }
    deleteZone(serverId, zoneId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield superagent_1.default
                    .delete(`${this.core.url}/servers/${serverId}/zones/${zoneId}`)
                    .set(this.core.apiKey);
                return query.ok;
            }
            catch (e) {
                return false;
            }
        });
    }
    modifyZone(serverId, zoneId, zone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield superagent_1.default
                    .patch(`${this.core.url}/servers/${serverId}/zones/${zoneId}`)
                    .send(zone)
                    .set(this.core.apiKey);
                return query.ok;
            }
            catch (e) {
                return false;
            }
        });
    }
    modifyBasicZone(serverId, zoneId, zone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield superagent_1.default
                    .put(`${this.core.url}/servers/${serverId}/zones/${zoneId}`)
                    .send(zone)
                    .set(this.core.apiKey);
                return query.ok;
            }
            catch (e) {
                console.log(e);
                return false;
            }
        });
    }
    retrieveSlaveZone(serverId, zoneId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield superagent_1.default
                    .put(`${this.core.url}/servers/${serverId}/zones/${zoneId}/axfr-retrieve`)
                    .set(this.core.apiKey);
                return query.ok;
            }
            catch (e) {
                return false;
            }
        });
    }
    sendDnsNotify(serverId, zoneId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield superagent_1.default
                    .put(`${this.core.url}/servers/${serverId}/zones/${zoneId}/notify`)
                    .set(this.core.apiKey);
                return query.ok;
            }
            catch (e) {
                return false;
            }
        });
    }
    exportZone(serverId, zoneId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield superagent_1.default
                    .get(`${this.core.url}/servers/${serverId}/zones/${zoneId}/export`)
                    .set(this.core.apiKey);
                return query.ok ? query.text : null;
            }
            catch (e) {
                return null;
            }
        });
    }
    rectifyZone(serverId, zoneId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield superagent_1.default
                    .put(`${this.core.url}/servers/${serverId}/zones/${zoneId}/rectify`)
                    .set(this.core.apiKey);
                return query.ok ? query.text : null;
            }
            catch (e) {
                return null;
            }
        });
    }
}
exports.ZoneEndpoint = ZoneEndpoint;
//# sourceMappingURL=ZoneEndpoint.js.map