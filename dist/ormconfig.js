"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./src/config");
exports.default = {
    "type": config_1.default.DB_TYPE,
    "host": config_1.default.DB_HOST,
    "port": 5432,
    "username": config_1.default.DB_USER,
    "password": config_1.default.DB_PASSWORD,
    "database": config_1.default.DB_NAME,
    "synchronize": true,
    "logging": false,
    "entities": [
        "src/entity/**/*.ts"
        // __dirname + "/../**/*.entity{.ts,.js}"
    ],
    "migrations": [
        "src/migration/**/*.ts"
    ],
    "subscribers": [
        "src/subscriber/**/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
};
//# sourceMappingURL=ormconfig.js.map