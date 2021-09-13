"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const walletCreditRequest_1 = require("../db/models/walletCreditRequest");
class WalletCreditRequestRepoImpl {
    async creditWallet(walletId, amount, cardDeets, currency) {
        return await walletCreditRequest_1.default.create({
            walletId,
            amount,
            currency,
            cardData: cardDeets
        });
    }
}
exports.default = new WalletCreditRequestRepoImpl();
//# sourceMappingURL=wallet-credit-request-repo-impl.js.map