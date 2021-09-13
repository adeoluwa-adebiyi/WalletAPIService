"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const transferSchema = new mongoose_1.Schema({
    amount: {
        type: Number,
        required: [true, "walletId cannot be empty"]
    },
    requestId: {
        type: String,
        default: uuid_1.v4()
    },
    description: {
        type: String,
    },
    currency: {
        type: String,
        required: [true, "currency cannot be empty"],
        enum: ["NGN", "USD", "ZAR"]
    },
}, {
    timestamps: true,
    discriminatorKey: "transferType",
});
exports.default = transferSchema;
//# sourceMappingURL=transfer.js.map