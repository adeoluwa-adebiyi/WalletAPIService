import { User } from "../entity/User";
import { Wallet } from "../entity/Wallet";
import {WalletRepo} from "./interfaces/wallet-repo";

export class WalletRepoImpl implements WalletRepo{
    getWalletById(id: number): Promise<Wallet> {
        throw new Error("Method not implemented.");
    }
    addWallet(user: User, wallet: Wallet): Promise<Wallet> {
        throw new Error("Method not implemented.");
    }
    deleteWallet(wallet: Wallet): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteWalletById(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    saveWallet(wallet: Wallet): Promise<Wallet> {
        throw new Error("Method not implemented.");
    }
}