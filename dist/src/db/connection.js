"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const mongoose_1 = require("mongoose");
exports.connect = async () => {
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
    return new Promise((resolve, reject) => mongoose_1.connect(config_1.default.DB_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex:true
        // useUnifiedTopology:true,
        autoIndex: true
    }, (err) => {
        console.log(err);
        if (err) {
            console.log(err);
            reject(err);
        }
        console.log("CONNECTED TO DB");
        resolve();
    }));
};
//# sourceMappingURL=connection.js.map