"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../common/errors");
const config_1 = require("../config");
const jsonwebtoken_1 = require("jsonwebtoken");
exports.authorize = (jwt) => {
    const token = jsonwebtoken_1.verify(jwt, config_1.default.APP_SECRET);
    if (!token) {
        throw Error(errors_1.USER_DOES_NOT_EXIST_ERROR);
    }
    const auth = jsonwebtoken_1.decode(jwt);
    if (auth["exp"] < Date.now() / 1000)
        throw Error(errors_1.USER_TOKEN_EXPIRED_ERROR);
    return auth["sub"];
};
exports.extractJwtToken = (authHeader) => {
    return authHeader.split(" ")[1].trim();
};
//# sourceMappingURL=auth.js.map