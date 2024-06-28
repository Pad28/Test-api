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
       
        this.app.get("*", (req, res) => {
            res.send("<h1>Hola mundo</h1>")
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