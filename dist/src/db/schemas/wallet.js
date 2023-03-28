"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const walletSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, "Wallet id is required"],
        unique: true,
        default: () => uuid_1.v4()
    },
    owner: {
        type: String,
        required: [true, "Wallet owner is required"]
    },
    balance: {
        type: Number,
        required: [true, "Wallet  balance is required"],
        default: 0.00
    },
    currency: {
        type: String,
        enum: ["NGN", "USD", "EUR"],
        required: [true, "Wallet currency is required"],
        default: "NGN"
    },
}, {
    timestamps: true
});
exports.default = walletSchema;
//# sourceMappingURL=wallet.js.map