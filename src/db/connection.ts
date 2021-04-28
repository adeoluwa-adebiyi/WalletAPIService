import config from "../config";
import { ENTITIES } from "../entity";
import { createConnection } from "typeorm";


export const connect = async()=>{
    return createConnection({
        type: "postgres",
        username: config.DB_USER,
        host: config.DB_HOST,
        password: config.DB_PASSWORD,
        database: config.DB_NAME,
        port: Number.parseInt(config.DB_PORT),
        entities: ENTITIES,
        synchronize: false
    });
}