import  config from "./config";
import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import { ENTITIES } from "./entity";
import app from "./app";

createConnection({
    type: "postgres",
    username: config.DB_USER,
    host: config.DB_HOST,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    port: Number.parseInt(config.DB_PORT),
    entities: ENTITIES,
    synchronize: false
}).then(async connection => {
    console.log("STARTING SERVER");
    app.listen(config.PORT);

}).catch(error => console.log(error));
