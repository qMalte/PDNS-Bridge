"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerDNS = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const CryptoKeyEndpoint_1 = require("./PowerDNS/CryptoKeyEndpoint");
const MetadataEndpoint_1 = require("./PowerDNS/MetadataEndpoint");
const ServerEndpoint_1 = require("./PowerDNS/ServerEndpoint");
const StatisticsEndpoint_1 = require("./PowerDNS/StatisticsEndpoint");
const ZoneEndpoint_1 = require("./PowerDNS/ZoneEndpoint");
class PowerDNS {
    static init() {
        dotenv_1.default.config();
        this.masterInstance = new PowerDNS(process.env.DNS_MASTER_HOSTNAME, process.env.DNS_MASTER_APIKEY);
        this.slaveInstances = process.env.DNS_SLAVES.split(',').map((hostname) => {
            return new PowerDNS(hostname, process.env.DNS_SLAVE_APIKEY);
        });
    }
    constructor(host, apiKeyRaw) {
        this.host = host;
        this.apiKeyRaw = apiKeyRaw;
        this.CryptoKeyEndpoint = new CryptoKeyEndpoint_1.CryptoKeyEndpoint(this);
        this.MetadataEndpoint = new MetadataEndpoint_1.MetadataEndpoint(this);
        this.ServerEndpoint = new ServerEndpoint_1.ServerEndpoint(this);
        this.StatisticEndpoint = new StatisticsEndpoint_1.StatisticsEndpoint(this);
        this.ZoneEndpoint = new ZoneEndpoint_1.ZoneEndpoint(this);
        //
    }
    get url() {
        return `http://${this.host}/api/v1`;
    }
    get apiKey() {
        return { 'X-API-Key': this.apiKeyRaw };
    }
}
exports.PowerDNS = PowerDNS;
//# sourceMappingURL=PowerDNS.js.map