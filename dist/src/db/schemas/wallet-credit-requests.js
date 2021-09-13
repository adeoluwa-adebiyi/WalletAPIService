"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const mongoose_1 = require("mongoose");
const walletCreditRequestSchema = new mongoose_1.Schema({
    requestId: {
        type: String,
        unique: true,
        default: () => uuid_1.v4(),
        required: [true, "requestId required"]
    },
    // status: {
    //     type: String,
    //     enum: ["pending", "success", "failure"],
    //     default: "pending"
    // },
    amount: {
        type: Number,
        required: [true, "amount is required"]
    },
    currency: {
        type: String,
        enum: ["NGN", "USD"],
        required: [true, "currency is required"]
    },
    walletId: {
        type: String,
        required: true
    },
    cardData: {
        type: Object
    }
}, {
    timestamps: true
});
exports.default = walletCreditRequestSchema;
//# sourceMappingURL=wallet-credit-requests.js.map