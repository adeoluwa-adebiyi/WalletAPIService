import { User } from "../../db/models/user";
import { Wallet } from "../../db/models/wallet";

export interface WalletTransferReceiver {
    walletUser: string;
}

export interface BankAccountReceiver {
    accountNo: string;
    bankRef: string;
}

export interface CardDetails{
    cardNo: String;
    cardUsername: String;
    cardCCV: String;
    cardPIN: String;
    cardExp: String;
}

export type MoneyReceiver = WalletTransferReceiver | BankAccountReceiver;

export interface WalletService{

    createUserWallet(userId: string, currency:string): Promise<Wallet>;
    deleteWallet(walletId: number): Promise<void>;
    creditWallet(walletId: String, amount: number, cardDeets:CardDetails, currency: String): Promise<any>;
    notifyOnWalletCreation(walletId: String, userId: String, currency: String): Promise<void>;
    transferMoney(walletId: number, amount: number, receiver: MoneyReceiver);
    // debitWallet(walletId: number, amount: number): Promise<number>;
    obtainWalletBalance(walletId:number): Promise<number>;
    getWallet(user: User, currency: String): Promise<Wallet>;

}