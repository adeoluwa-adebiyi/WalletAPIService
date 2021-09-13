"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// const transferSchema = require("./transfer");
exports.default = new mongoose_1.Schema({
    sourceWalletId: {
        type: String,
        required: [true, "sourceWalletId cannot be empty"]
    },
    destinationWalletId: {
        type: String,
        required: [true, "destinationWalletId cannot be empty"]
    }
});
//# sourceMappingURL=walletTransfer.js.map