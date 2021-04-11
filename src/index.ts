import  config from "./config";
import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import { ENTITIES } from "./entity";

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

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.email = "timber@mail.com"
    user.passwordHash = "testhash"
    const userRepo = await connection.getRepository(User);
    await userRepo.delete({id:null});
    await userRepo.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await userRepo.find();
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
