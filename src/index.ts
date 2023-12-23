import {PowerDNS} from "./services/PowerDNS";
import {JobService} from "./services/JobService";
import http from "http";
import process from "process";
import express from "express";
import CorsMiddleware from "./middlewares/CorsMiddleware";
import LogUrlMiddleware from "./middlewares/LogUrlMiddleware";
import router from "./routes/api";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {ZoneHelper} from "./utils/ZoneHelper";

dotenv.config();

export class App {

    private app = express();
    private httpServer = http.createServer(this.app);
    private httpPort = process.env.HTTP_PORT || 8080;

    async bootstrap() {
        PowerDNS.init();
        await JobService.init();
        return this;
    }

    initializeMiddlewares() {
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
        this.app.use(CorsMiddleware);
        this.app.use(LogUrlMiddleware);
        return this;
    }

    setupRouting() {
        this.app.use('/api/v1', router);
        return this;
    }

    listen() {
        this.httpServer.listen(this.httpPort, () => {
            console.log(`Der HTTP-Server wurde unter Port: ${this.httpPort} gestartet!`);
        });
        return this;
    }

}

new App().bootstrap().then(app => {
    app.initializeMiddlewares();
    app.setupRouting();
    app.listen();
});