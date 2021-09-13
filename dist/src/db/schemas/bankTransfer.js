"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.default = new mongoose_1.Schema({
    nuban: {
        type: String,
        required: [true, "nuban cannot be empty"]
    },
    bankAccount: {
        type: String,
        required: [true, "bankAccount cannot be empty"]
    }
});
//# sourceMappingURL=bankTransfer.js.map