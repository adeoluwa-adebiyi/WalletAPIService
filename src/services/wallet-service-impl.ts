import wallet, { Wallet } from "../db/models/wallet";
import { User } from "../db/models/user";
import { CardDetails, MoneyReceiver, WalletService } from "./interfaces/wallet-service";
import UserRepositoryImpl from "../repos/user-repo-impl";
import WalletRepositoryImpl from "../repos/wallet-repo-impl"
import { UserRepository } from "../repos/interfaces/user-repo";
import { WalletRepo } from "../repos/interfaces/wallet-repo";
import WalletCreditRequestRepoImpl from "../repos/wallet-credit-request-repo-impl";
import { WalletCreditRequestRepo } from "../repos/interfaces/wallet-credit-requests-repo";
import eventBus from "../bus/event-bus";
import { WalletCreatedMessage } from "../processors/messages/account-created-msg";
import { WALLET_EVENTS_TOPIC } from "../topics";



class WalletServiceImpl implements WalletService{

    async notifyOnWalletCreation(walletId: String, userId: String, currency: String): Promise<void> {
        (await eventBus).submitRequest(new WalletCreatedMessage({
            walletId,
            userId,
            currency
        }),WALLET_EVENTS_TOPIC);
    }

    private get walletRepo(): WalletRepo{
        return WalletRepositoryImpl;
    }

    private get userRepo(): UserRepository{
        return UserRepositoryImpl;
    }

    private get walletCreditRequestRepo(): WalletCreditRequestRepo{
        return WalletCreditRequestRepoImpl;
    }

    async createUserWallet(userId: string, currency: string="NGN"): Promise<Wallet> {
        console.log(`USERID: ${userId}`);
        const user: User = await this.userRepo.getUserById(userId);
        console.log(`USER: ${user}`);
        return await this.walletRepo.addWallet(user, currency);
    }

    async deleteWallet(walletId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async creditWallet(walletId: String, amount: number, cardDeets: CardDetails, currency: String): Promise<any> {
        return this.walletCreditRequestRepo.creditWallet(
            walletId,
            amount,
            cardDeets,
            currency
        );
    }

    async transferMoney(walletId: number, amount: number, receiver: MoneyReceiver) {
        throw new Error("Method not implemented.");
    }

    async obtainWalletBalance(walletId: number): Promise<number> {
        throw new Error("Method not implemented.");
    }

    async getWallet(user: User, currency: String): Promise<Wallet> {
        return wallet.findOne({
            owner: user.id,
            currency
        });
    }

}

export default new WalletServiceImpl();