"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
class JwtTokenServiceImpl {
    encode(claims, expiresIn = "1h") {
        const { exp = expiresIn, sub, ...otherClaims } = claims;
        return jsonwebtoken_1.sign({ ...otherClaims }, Buffer.from(config_1.default.APP_SECRET), { expiresIn: exp, subject: sub.toString() });
    }
    verify(jwt) {
        return jsonwebtoken_1.verify(jwt, config_1.default.APP_SECRET);
    }
    decode(jwt) {
        return jsonwebtoken_1.decode(jwt, { json: true });
    }
}
exports.JwtTokenServiceImpl = JwtTokenServiceImpl;
exports.default = new JwtTokenServiceImpl();
//# sourceMappingURL=jwt-token-service-impl.js.map