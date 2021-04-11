var config_1 = require("./config");
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
var entity_1 = require("./entity");
typeorm_1.createConnection({
    type: "postgres",
    username: config_1.default.DB_USER,
    host: config_1.default.DB_HOST,
    password: config_1.default.DB_PASSWORD,
    database: config_1.default.DB_NAME,
    port: Number.parseInt(config_1.default.DB_PORT),
    entities: entity_1.ENTITIES,
    synchronize: false
}).then(async, function (connection) {
    console.log("Inserting a new user into the database...");
    var user = new User_1.User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.email = "timber@mail.com";
    user.passwordHash = "testhash";
    var userRepo = await, connection, getRepository = (User_1.User);
    await;
    userRepo.delete({ id: null });
    await;
    userRepo.save(user);
    console.log("Saved a new user with id: " + user.id);
    console.log("Loading users from the database...");
    var users = await, userRepo, find = ();
    console.log("Loaded users: ", users);
    console.log("Here you can setup and run express/koa/any other framework.");
}).catch(function (error) { return console.log(error); });
//# sourceMappingURL=index.js.map