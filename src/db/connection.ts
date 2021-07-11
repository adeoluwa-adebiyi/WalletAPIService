import config from "../config";
import { ENTITIES } from "../entity";
import { createConnection, MongoError } from "typeorm";
import { connect as mongoConnect } from "mongoose";
import app from "../app";


export const connect = async()=>{
    // return createConnection({
    //     type: "postgres",
    //     username: config.DB_USER,
    //     host: config.DB_HOST,
    //     password: config.DB_PASSWORD,
    //     database: config.DB_NAME,
    //     port: Number.parseInt(config.DB_PORT),
    //     entities: ENTITIES,
    //     synchronize: false
    // });
    return new Promise<void>((resolve, reject) =>mongoConnect(config.DB_URL,{
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex:true
        // useUnifiedTopology:true,
        autoIndex:true
    }, (err: MongoError)=>{
        console.log(err);
        if(err){
            console.log(err);
            reject(err);
        }
        console.log("CONNECTED TO DB");
        resolve();
    }));
}