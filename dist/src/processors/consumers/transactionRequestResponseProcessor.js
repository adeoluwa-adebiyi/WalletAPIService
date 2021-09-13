"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transactionRequestResponseV1_1 = require("../messages/transactionRequestResponseV1");
class TransactionRequestResponseProcessor {
    constructor() {
    }
    process(message) {
        throw new Error("Method not implemented.");
    }
    register() {
        throw new Error("Method not implemented.");
    }
    getDeserializer() {
        throw new Error("Method not implemented.");
    }
    getProcessor(message) {
        if (message instanceof transactionRequestResponseV1_1.TransactionRequestResponseV1) {
            return this;
        }
        throw Error("No processor available for this message");
    }
    processMessage(message) {
        const processor = this.getProcessor(message);
        if (processor === this) {
            return this.process(message);
        }
        return;
    }
}
exports.TransactionRequestResponseProcessor = TransactionRequestResponseProcessor;
//# sourceMappingURL=transactionRequestResponseProcessor.js.map