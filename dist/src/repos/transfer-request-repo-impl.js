"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const walletTransfer_1 = require("../db/models/walletTransfer");
class TransferRequestRepo {
    async createWalletTransferRequest(request) {
        return await new walletTransfer_1.default(request).save();
    }
}
exports.TransferRequestRepo = TransferRequestRepo;
exports.default = new TransferRequestRepo();
//# sourceMappingURL=transfer-request-repo-impl.js.map