"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TransactionRequestResponseProcessor {
    async process(consumer) {
        await consumer.subscribe({ topic: "transfer-response" });
        await consumer.run({
            eachBatch: async (payload) => {
                const { batch, resolveOffset } = payload;
                console.log(batch.messages);
                for (let message of batch.messages) {
                    resolveOffset(message.offset);
                }
            }
        });
    }
}
exports.TransactionRequestResponseProcessor = TransactionRequestResponseProcessor;
//# sourceMappingURL=transfers.js.map