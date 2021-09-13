"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
exports.default = {
    APP_SECRET: null,
    DB_TYPE: null,
    DB_HOST: null,
    DB_USER: null,
    DB_PASSWORD: null,
    DB_NAME: null,
    DB_PORT: null,
    DB_URL: null,
    PORT: null,
    KAFKA_BOOTSTRAP_SERVER: null,
    ...process.env
};
//# sourceMappingURL=index.js.map