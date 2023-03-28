"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataclass_1 = require("dataclass");
class TransactionRequestResponseV1 extends dataclass_1.default {
    constructor() {
        super(...arguments);
        this.version = "1";
        this.name = "TransactionRequestResponse";
    }
    serialize() {
        throw new Error("Method not implemented.");
    }
    deserialize(json) {
        throw new Error("Method not implemented.");
    }
    getVersion() {
        return this.version;
    }
    getKey() {
        return `${this.name}:${this.version}`;
    }
}
exports.TransactionRequestResponseV1 = TransactionRequestResponseV1;
//# sourceMappingURL=transactionRequestResponseV1.js.map