"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transfer_1 = require("./transfer");
const bankTransfer_1 = require("../schemas/bankTransfer");
exports.default = transfer_1.default.discriminator("BankTransfer", bankTransfer_1.default);
//# sourceMappingURL=bankTransfer.js.map