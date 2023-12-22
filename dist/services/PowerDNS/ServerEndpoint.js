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
exports.ServerEndpoint = void 0;
const superagent_1 = __importDefault(require("superagent"));
class ServerEndpoint {
    constructor(core) {
        this.core = core;
        //
    }
    servers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield superagent_1.default
                    .get(`${this.core.url}/servers`)
                    .set(this.core.apiKey);
                return query.ok ? query.body : null;
            }
            catch (e) {
                return null;
            }
        });
    }
    server(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield superagent_1.default
                    .get(`${this.core.url}/servers/${id}`)
                    .set(this.core.apiKey);
                return query.ok ? query.body : null;
            }
            catch (e) {
                return null;
            }
        });
    }
}
exports.ServerEndpoint = ServerEndpoint;
//# sourceMappingURL=ServerEndpoint.js.map