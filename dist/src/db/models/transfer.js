"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transfer_1 = require("../schemas/transfer");
// const walletTransfer = require("../schemas/transfer/walletTransfer");
exports.default = mongoose_1.model("transfer", transfer_1.default);
// BankTransfer: new model("BankTransfer", bankTransfer),
// WalletTransfer: new model("WalletTransfer", walletTransfer)
//# sourceMappingURL=transfer.js.map