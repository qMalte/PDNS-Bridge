import dotenv from 'dotenv';
import validator from 'validator';
import {CryptoKeyEndpoint} from "./PowerDNS/CryptoKeyEndpoint";
import {MetadataEndpoint} from "./PowerDNS/MetadataEndpoint";
import {ServerEndpoint} from "./PowerDNS/ServerEndpoint";
import {StatisticsEndpoint} from "./PowerDNS/StatisticsEndpoint";
import {ZoneEndpoint} from "./PowerDNS/ZoneEndpoint";

export class PowerDNS {

    static masterInstance: PowerDNS;
    static slaveInstances: PowerDNS[];

    static init() {
        dotenv.config();
       this.masterInstance = new PowerDNS(process.env.DNS_MASTER_HOSTNAME, process.env.DNS_MASTER_APIKEY);
         this.slaveInstances = process.env.DNS_SLAVES.split(',').map((hostname) => {
              return new PowerDNS(hostname, process.env.DNS_SLAVE_APIKEY);
         });
    }

    CryptoKeyEndpoint = new CryptoKeyEndpoint(this);
    MetadataEndpoint = new MetadataEndpoint(this);
    ServerEndpoint = new ServerEndpoint(this);
    StatisticEndpoint = new StatisticsEndpoint(this);
    ZoneEndpoint = new ZoneEndpoint(this);

    constructor(public host: string, public apiKeyRaw: string) {
        //
    }

    get url() {
        return `http://${this.host}/api/v1`;
    }

    get apiKey() {
        return { 'X-API-Key': this.apiKeyRaw };
    }

}