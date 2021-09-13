import { User } from "../../db/models/user";
import { Wallet } from "../../db/models/wallet";

export interface WalletTransferReceiver{
    walletUser: string;
}

export interface BankAccountReceiver {
    accountNo: string;
    bankRef: string;
}

export type TransferRequest = WalletTransferRequest | BankTransferRequest;

export interface WalletTransferRequest{
    sourceWalletId: string;
    destinationWalletId: string;
    amount: number;
    currency?:String;
    requestId?: String;
}

export interface BankTransferRequest{
    sourceWalletId: string;
    accountNumber: string;
    bankNuban: string;
    description: string;
    amount: number;
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
    transferMoney(walletId: string, amount: number, receiver: MoneyReceiver);
    transferToWallet(ownerWalletId: string, userId: string,amount: number):Promise<TransferRequest>;
    // debitWallet(walletId: number, amount: number): Promise<number>;
    obtainWalletBalance(walletId:number): Promise<number>;
    getWallet(user: User, currency: String): Promise<Wallet>;

}