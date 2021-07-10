import { Wallet } from "../../db/models/wallet";

export interface WalletTransferReceiver {
    walletUser: string;
}

export interface BankAccountReceiver {
    accountNo: string;
    bankRef: string;
}

export type MoneyReceiver = WalletTransferReceiver | BankAccountReceiver;

export interface WalletService{

    createUserWallet(userId: string, currency:string): Promise<Wallet>;
    deleteWallet(walletId: number): Promise<void>;
    creditWallet(walletId: number, amount: number): Promise<number>;
    transferMoney(walletId: number, amount: number, receiver: MoneyReceiver);
    // debitWallet(walletId: number, amount: number): Promise<number>;
    obtainWalletBalance(walletId:number): Promise<number>;

}