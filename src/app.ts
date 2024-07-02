import path from "path";
import express, { Application } from "express";
import cors from "cors";
import { envs } from "./envs";

interface ServerOptions {
    port: number;
}

class Server {

    private readonly app: Application;

    constructor(
        private readonly options: ServerOptions,
    ) {
        this.app = express();
    }

    public async start() {
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }) );

        this.app.use( cors() );
        this.app.use( express.static("public") );
        
        this.app.get("/mqtt-code-esp", (req, res) => {
            res.download(path.resolve(__dirname, "../files/mqttTest.py"));
        })

        this.app.get("/mqtt-code-movil", (req, res) => {
            res.download(path.resolve(__dirname, "../files/Sockettest.zip"));
        })
        
        this.app.get("/mqtt-code-movil/main", (req, res) => {
            res.sendFile(path.resolve(__dirname, "../files/MainActivity.txt"));
        })
        this.app.get("/mqtt-code-movil/socket-manager", (req, res) => {
            res.sendFile(path.resolve(__dirname, "../files/SocketManager.txt"));
        })
        this.app.get("/mqtt-code-movil/gradle", (req, res) => {
            res.sendFile(path.resolve(__dirname, "../files/build.gradle.txt"));
        })

        this.app.get("/mqtt-code-movil/manifest", (req, res) => {
            res.sendFile(path.resolve(__dirname, "../files/manifest.txt"));
        })
        
        this.app.get("*", (req, res) => {
            res.send("<h1>404 | Not found</h1>")
        });

        this.app.listen(this.options.port, () => {
            console.log(`Server listening in port ${this.options.port}`);
        })
    }

}


const server = new Server({
    port: envs.PORT,
})

server.start();