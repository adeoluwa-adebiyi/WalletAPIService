"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_1 = require("../db/models/wallet");
const user_repo_impl_1 = require("../repos/user-repo-impl");
const wallet_repo_impl_1 = require("../repos/wallet-repo-impl");
const wallet_credit_request_repo_impl_1 = require("../repos/wallet-credit-request-repo-impl");
const event_bus_1 = require("../bus/event-bus");
const account_created_msg_1 = require("../processors/messages/account-created-msg");
const topics_1 = require("../topics");
const messaging_1 = require("../helpers/messaging");
const wallet_transfer_money_message_1 = require("../processors/messages/wallet-transfer-money-message");
const transfer_request_repo_impl_1 = require("../repos/transfer-request-repo-impl");
class WalletServiceImpl {
    async transferMoney(walletId, amount, receiver) {
        if (receiver.hasOwnProperty("walletUser")) {
            try {
                const request = await this.transferToWallet(walletId, receiver.walletUser, amount);
                return request;
            }
            catch (e) {
                throw Error("Wallet transfer request failed");
            }
        }
    }
    async transferToWallet(ownerWalletId, userId, amount) {
        const ownerWallet = await this.walletRepo.getWalletById(ownerWalletId);
        let destinationWalletId = (await this.walletRepo.getUserWallet(userId, ownerWallet.currency)).id.toString();
        if (!destinationWalletId) {
            destinationWalletId = (await this.createUserWallet(userId, ownerWallet.currency.toString())).id.toString();
        }
        const transfer = await transfer_request_repo_impl_1.default.createWalletTransferRequest({
            sourceWalletId: ownerWalletId,
            destinationWalletId,
            amount: amount,
        });
        const transferRequest = new wallet_transfer_money_message_1.WalletTransferMoneyMessage({
            sourceWalletId: ownerWalletId,
            destinationWalletId,
            amount: amount,
            requestId: transfer.requestId
        });
        await messaging_1.sendMessage((await event_bus_1.default), topics_1.WALLET_TRX_EVENTS_TOPIC, transferRequest);
        return transferRequest;
    }
    async notifyOnWalletCreation(walletId, userId, currency) {
        (await event_bus_1.default).submitRequest(new account_created_msg_1.WalletCreatedMessage({
            walletId,
            userId,
            currency
        }), topics_1.WALLET_EVENTS_TOPIC);
    }
    get walletRepo() {
        return wallet_repo_impl_1.default;
    }
    get userRepo() {
        return user_repo_impl_1.default;
    }
    get walletCreditRequestRepo() {
        return wallet_credit_request_repo_impl_1.default;
    }
    async createUserWallet(userId, currency = "NGN") {
        const user = await this.userRepo.getUserById(userId);
        return await this.walletRepo.addWallet(user, currency);
    }
    async deleteWallet(walletId) {
        throw new Error("Method not implemented.");
    }
    async creditWallet(walletId, amount, cardDeets, currency) {
        return this.walletCreditRequestRepo.creditWallet(walletId, amount, cardDeets, currency);
    }
    async obtainWalletBalance(walletId) {
        throw new Error("Method not implemented.");
    }
    async getWallet(user, currency) {
        return wallet_1.default.findOne({
            owner: user.id,
            currency
        });
    }
}
exports.default = new WalletServiceImpl();
//# sourceMappingURL=wallet-service-impl.js.map