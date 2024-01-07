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
exports.App = void 0;
const PowerDNS_1 = require("./services/PowerDNS");
const JobService_1 = require("./services/JobService");
const http_1 = __importDefault(require("http"));
const process_1 = __importDefault(require("process"));
const express_1 = __importDefault(require("express"));
const CorsMiddleware_1 = __importDefault(require("./middlewares/CorsMiddleware"));
const LogUrlMiddleware_1 = __importDefault(require("./middlewares/LogUrlMiddleware"));
const api_1 = __importDefault(require("./routes/api"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const lib_1 = require("typeauthx/lib");
const user_1 = require("./routes/user");
dotenv_1.default.config();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.httpServer = http_1.default.createServer(this.app);
        this.httpPort = process_1.default.env.HTTP_PORT || 8080;
    }
    bootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
            PowerDNS_1.PowerDNS.init();
            yield JobService_1.JobService.init();
            yield (0, lib_1.InitializeTypeAuthX)(this.app);
            return this;
        });
    }
    initializeMiddlewares() {
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(body_parser_1.default.json());
        this.app.use(CorsMiddleware_1.default);
        this.app.use(LogUrlMiddleware_1.default);
        return this;
    }
    setupRouting() {
        this.app.use('/api/v1', api_1.default);
        this.app.use('/api/v1/user', user_1.userRouter);
        return this;
    }
    listen() {
        this.httpServer.listen(this.httpPort, () => {
            console.log(`Der HTTP-Server wurde unter Port: ${this.httpPort} gestartet!`);
        });
        return this;
    }
}
exports.App = App;
new App().bootstrap().then(app => {
    app.initializeMiddlewares();
    app.setupRouting();
    app.listen();
});
//# sourceMappingURL=index.js.map