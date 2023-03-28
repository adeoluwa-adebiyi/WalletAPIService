import { Repository } from "./repo";
import { Wallet } from "../../db/models/wallet";
import { User } from "../../db/models/user";

export interface WalletRepo extends Repository<Wallet>{
    getWalletById(id: string): Promise<Wallet>;
    addWallet(user: User, currencySymbol: string): Promise<Wallet>;
    deleteWallet(wallet: Wallet): Promise<void>;
    deleteWalletById(id: number):Promise<void>;
    deleteWalletByUser(user: User): Promise<void>;
    getUserWallet(userId: string, currency):Promise<Wallet>;
    getUserWallets(userId: string): Promise<Array<Wallet>>;
    saveWallet(wallet: Wallet): Promise<Wallet>;
}