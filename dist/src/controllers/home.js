"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_impl_1 = require("../services/auth-service-impl");
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const response = await auth_service_impl_1.default.login(email, password);
        res.send({ ...response });
    }
    catch (e) {
        res.status(401).send({
            status: "failure",
            message: e.message
        });
    }
};
const register = async (req, res, next) => {
    try {
        const { email, password, firstname, lastname } = req.body;
        const response = await auth_service_impl_1.default.registerUser(email, password, firstname, lastname);
        res.send({
            status: "success",
            message: "User registered successfully"
        });
    }
    catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message
        });
    }
};
exports.default = {
    login,
    register
};
//# sourceMappingURL=home.js.map