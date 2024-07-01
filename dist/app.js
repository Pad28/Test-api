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
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const envs_1 = require("./envs");
class Server {
    constructor(options) {
        this.options = options;
        this.app = (0, express_1.default)();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: true }));
            this.app.use((0, cors_1.default)());
            this.app.get("/cert", (req, res) => {
                res.download(path_1.default.resolve(envs_1.envs.SSL_CERT), (err) => {
                    console.error('Error al descargar el archivo:', err);
                    if (!res.headersSent) {
                        res.status(500).send(`<h1>Error al descargar el archivo</h1>`);
                    }
                });
            });
            this.app.get("/key", (req, res) => {
                res.download(path_1.default.resolve(envs_1.envs.SSL_KEY), (err) => {
                    console.error('Error al descargar el archivo:', err);
                    if (!res.headersSent) {
                        res.status(500).send(`<h1>Error al descargar el archivo</h1>`);
                    }
                });
            });
            this.app.get("*", (req, res) => {
                res.send("<h1>Hola mundo</h1>");
            });
            this.app.listen(this.options.port, () => {
                console.log(`Server listening in port ${this.options.port}`);
            });
        });
    }
}
const server = new Server({
    port: envs_1.envs.PORT,
});
server.start();
