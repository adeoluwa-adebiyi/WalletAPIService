"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const currencySchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, "Currency id is required"],
        unique: true
    },
    symbol: {
        type: String,
        required: [true, "Currency symbol is required"],
    },
    description: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});
exports.default = currencySchema;
//# sourceMappingURL=currency.js.map