import  config from "./config";
import "reflect-metadata";
import {createConnection} from "typeorm";
import {User, UserSubscriber} from "./entity/User";
import { ENTITIES } from "./entity";
import app from "./app";
import { connect } from "./db/connection";

connect().then(async connection => {
    console.log("STARTING SERVER");
    app.listen(config.PORT);

}).catch(error => console.log(error));
