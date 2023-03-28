"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../helpers/auth");
exports.userSessionMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const jwtString = auth_1.extractJwtToken(authHeader);
    try {
        const userId = auth_1.authorize(jwtString);
        req.user = { id: userId };
    }
    catch (e) {
        req.user = null;
    }
    next();
};
exports.userAuthenticated = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            status: "failure",
            message: "User not authenticated!"
        });
    }
    else {
        next();
    }
};
//# sourceMappingURL=userSession.js.map