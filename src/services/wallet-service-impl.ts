import wallet, { Wallet } from "../db/models/wallet";
import { User } from "../db/models/user";
import { BankAccountReceiver, CardDetails, MoneyReceiver, TransferRequest, WalletService, WalletTransferReceiver, WalletTransferRequest } from "./interfaces/wallet-service";
import UserRepositoryImpl from "../repos/user-repo-impl";
import WalletRepositoryImpl from "../repos/wallet-repo-impl"
import { UserRepository } from "../repos/interfaces/user-repo";
import { WalletRepo } from "../repos/interfaces/wallet-repo";
import WalletCreditRequestRepoImpl from "../repos/wallet-credit-request-repo-impl";
import { WalletCreditRequestRepo } from "../repos/interfaces/wallet-credit-requests-repo";
import eventBus, { KafkaJSEventBus } from "../bus/event-bus";
import { WalletCreatedMessage } from "../processors/messages/account-created-msg";
import { WALLET_EVENTS_TOPIC, WALLET_TRX_EVENTS_TOPIC } from "../topics";
import { sendMessage } from "../helpers/messaging";
import { KafkaService } from "../kafka";
import { WalletTransferMoneyMessage } from "../processors/messages/wallet-transfer-money-message";
import  TransferRequestRepo  from "../repos/transfer-request-repo-impl";
import { BankPayoutParams } from "../processors/messages/bank-payout-msg";
import walletRepoImpl from "../repos/wallet-repo-impl";
import transferRequestRepoImpl from "../repos/transfer-request-repo-impl";
import { createMessage } from "../utils";


class WalletServiceImpl implements WalletService{

    async getUserWallets(userId: string): Promise<Wallet[]> {
        return this.walletRepo.getUserWallets(userId);
    }

    async transferToBank(params: BankPayoutParams): Promise<TransferRequest> {
        return await transferRequestRepoImpl.createBankPayout(params);
    }

    async transferMoney(walletId: string, amount: number, receiver: MoneyReceiver): Promise<TransferRequest> {
        if(receiver.hasOwnProperty("walletUser")){
            try{
                const request = await this.transferToWallet(walletId, (<WalletTransferReceiver>receiver).walletUser, amount);
                return request;
            }catch(e){
                throw Error("Wallet transfer request failed");
            }
        }

        if(receiver.hasOwnProperty("destinationAccount")){
            try{
                return await this.transferToBank(receiver as BankAccountReceiver);
            }catch(e){
                console.log(e);
                throw Error("Bank transfer request failed");
            }
        }
    }

    async transferToWallet(ownerWalletId: string, userId: string, amount: number): Promise<TransferRequest> {
        const ownerWallet: Wallet = await this.walletRepo.getWalletById(ownerWalletId);
        let destinationWalletId: string = (await this.walletRepo.getUserWallet(userId, ownerWallet.currency)).id.toString();
        if(!destinationWalletId){
            destinationWalletId = (await this.createUserWallet(userId, ownerWallet.currency.toString())).id.toString();
        }
        
        const transfer = await TransferRequestRepo.createWalletTransferRequest(<WalletTransferRequest>{
            sourceWalletId: ownerWalletId,
            currency: ownerWallet.currency.toString(),
            destinationWalletId,
            amount: amount,
            key: userId
        });

        const transferRequest = createMessage<WalletTransferMoneyMessage, String>(WalletTransferMoneyMessage,{
            sourceWalletId: ownerWalletId,
            destinationWalletId,
            currency: ownerWallet.currency.toString(),
            amount: amount,
            requestId: transfer.requestId
        }, userId);

        await sendMessage((await eventBus), WALLET_TRX_EVENTS_TOPIC, transferRequest);
        return transferRequest;
    }

    async notifyOnWalletCreation(walletId: String, userId: String, currency: String): Promise<void> {
        const walletCreatedNotification = createMessage<WalletCreatedMessage, String>(WalletCreatedMessage, {
            walletId,
            userId,
            currency
        }, userId);
        await sendMessage((await eventBus), WALLET_EVENTS_TOPIC, walletCreatedNotification);
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
        const user: User = await this.userRepo.getUserById(userId);
        return await this.walletRepo.addWallet(user, currency);
    }

    async deleteWallet(walletId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async creditWallet(walletId: String, amount: number, cardDeets: CardDetails, currency: String): Promise<any> {
        const wallet = await this.walletRepo.getWalletById(walletId.toString());
        return this.walletCreditRequestRepo.creditWallet(
            walletId,
            amount,
            cardDeets,
            currency,
            wallet.owner
        );
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