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
exports.MetadataEndpoint = void 0;
const superagent_1 = __importDefault(require("superagent"));
class MetadataEndpoint {
    constructor(core) {
        this.core = core;
        //
    }
    getZoneMetadata(serverId, zoneId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield superagent_1.default
                    .get(`${this.core.url}/servers/${serverId}/zones/${zoneId}/metadata`)
                    .set(this.core.apiKey);
                return query.ok ? query.body : null;
            }
            catch (e) {
                return null;
            }
        });
    }
    createZoneMetadata(serverId, zoneId, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield superagent_1.default
                    .post(`${this.core.url}/servers/${serverId}/zones/${zoneId}/metadata`)
                    .send(metadata)
                    .set(this.core.apiKey);
                return query.ok;
            }
            catch (e) {
                return false;
            }
        });
    }
    getMetadataByKind(serverId, zoneId, metadataKind) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield superagent_1.default
                    .get(`${this.core.url}/servers/${serverId}/zones/${zoneId}/metadata/${metadataKind}`)
                    .set(this.core.apiKey);
                return query.ok ? query.body : null;
            }
            catch (e) {
                return null;
            }
        });
    }
    replaceMetadataByKind(serverId, zoneId, metadataKind, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield superagent_1.default
                    .put(`${this.core.url}/servers/${serverId}/zones/${zoneId}/metadata/${metadataKind}`)
                    .send(metadata)
                    .set(this.core.apiKey);
                return query.ok ? query.body : null;
            }
            catch (e) {
                return null;
            }
        });
    }
    deleteMetadataByKind(serverId, zoneId, metadataKind) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield superagent_1.default
                    .delete(`${this.core.url}/servers/${serverId}/zones/${zoneId}/metadata/${metadataKind}`)
                    .set(this.core.apiKey);
                return query.ok;
            }
            catch (e) {
                return false;
            }
        });
    }
}
exports.MetadataEndpoint = MetadataEndpoint;
//# sourceMappingURL=MetadataEndpoint.js.map