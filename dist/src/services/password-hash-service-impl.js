"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
class PasswordHashServiceImpl {
    constructor() {
        this.saltRounds = 10;
    }
    async compare(data, hash) {
        return bcrypt.compare(data, hash);
    }
    async hash(data) {
        return bcrypt.hash(data, this.saltRounds);
    }
}
exports.PasswordHashServiceImpl = PasswordHashServiceImpl;
//# sourceMappingURL=password-hash-service-impl.js.map