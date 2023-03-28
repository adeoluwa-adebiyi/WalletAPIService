"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const transactionRequestSchema = new mongoose_1.Schema({
    id: {
        type: String,
        default: () => uuid_1.v4()
    },
    amount: {
        type: mongoose_1.Schema.Types.Number,
        required: [true, "Transaction request amount is required"]
    },
    type: {
        type: String,
        enum: [
            "inflow",
            "outflow"
        ]
    },
    destinationWallet: {
        type: String,
        required: [true, "Transaction request destinationWallet is required"]
    },
    sourceWallet: {
        type: String,
        required: [true, "Transaction request sourceWallet is required"]
    },
    requestee: {
        type: String,
        required: [true, "Transaction request requestee is required"]
    },
    status: {
        type: String,
        enum: [
            "pending",
            "completed",
            "failed",
            "rejected"
        ],
        default: "pending"
    }
}, {
    timestamps: true
});
exports.default = transactionRequestSchema;
//# sourceMappingURL=transactionRequest.js.map