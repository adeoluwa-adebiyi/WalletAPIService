var config = require("./config/index.ts");
module.exports = {
    "type": config.DB_TYPE,
    "host": config.DB_HOST,
    "port": 5432,
    "username": config.DB_USER,
    "password": config.DB_PASSWORD,
    "database": config.DB_NAME,
    "synchronize": true,
    "logging": false,
    "entities": [
        // "dist/entity/**/*.js"
        __dirname + "/../**/*.entity{.ts,.js}"
    ],
    "migrations": [
        "dist/migration/**/*.js"
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