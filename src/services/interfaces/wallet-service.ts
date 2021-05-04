import { Wallet } from "../../db/models/wallet";

export interface WalletService{

    createUserWallet(userId: string, currency:string): Promise<Wallet>;
    deleteWallet(walletId: number): Promise<void>;
    creditWallet(walletId: number, amount: number): Promise<number>;
    debitWallet(walletId: number, amount: number): Promise<number>;
    obtainWalletBalance(walletId:number): Promise<number>;

}