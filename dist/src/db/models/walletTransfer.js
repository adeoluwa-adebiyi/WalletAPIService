"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const walletTransfer_1 = require("../schemas/walletTransfer");
const transfer_1 = require("./transfer");
exports.default = transfer_1.default.discriminator("WalletTransfer", walletTransfer_1.default);
//# sourceMappingURL=walletTransfer.js.map