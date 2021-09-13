"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_1 = require("../db/models/wallet");
class WalletRepoImpl {
    getUserWallet(userId, currency) {
        throw new Error("Method not implemented.");
    }
    async deleteWalletByUser(user) {
        await wallet_1.default.deleteMany({ owner: user.id });
    }
    get model() {
        return wallet_1.default;
    }
    async getWalletById(id) {
        const wallet = await wallet_1.default.findOne({ id });
        return wallet;
    }
    async addWallet(user, currencySymbol) {
        const wallet = await new wallet_1.default({ owner: user.id, currency: currencySymbol }).save();
        console.log(wallet);
        return wallet;
    }
    deleteWallet(wallet) {
        throw new Error("Method not implemented.");
    }
    deleteWalletById(id) {
        throw new Error("Method not implemented.");
    }
    saveWallet(wallet) {
        throw new Error("Method not implemented.");
    }
}
exports.default = new WalletRepoImpl();
//# sourceMappingURL=wallet-repo-impl.js.map