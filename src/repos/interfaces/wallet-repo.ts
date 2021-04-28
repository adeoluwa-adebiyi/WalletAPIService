import { Repository } from "./repo";
import { User } from "../../entity/User";
import { Wallet } from "../../entity/Wallet";

export interface WalletRepo extends Repository<Wallet>{
    getWalletById(id: number): Promise<Wallet>;
    addWallet(user: User, wallet:Wallet): Promise<Wallet>;
    deleteWallet(wallet: Wallet): Promise<void>;
    deleteWalletById(id: number):Promise<void>;
    saveWallet(wallet: Wallet): Promise<Wallet>;
}