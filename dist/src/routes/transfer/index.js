"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TransferController = require("../../controllers/wallet-fund-transfer");
const route = express_1.Router();
route.post("/wallet", TransferController.transferToWallet);
exports.default = route;
//# sourceMappingURL=index.js.map