import WalletModel, { Wallet } from "../db/models/wallet";
import { User } from "../db/models/user";
import { WalletRepo } from "./interfaces/wallet-repo";
import { Model } from "mongoose";

class WalletRepoImpl implements WalletRepo {

    async getUserWallets(userId: string): Promise<Wallet[]> {
        const wallets = await WalletModel.find({owner: userId});
        return wallets;
    }
    
    async getUserWallet(userId: string, currency: any): Promise<Wallet> {
        const wallet = await WalletModel.findOne({owner: userId, currency});
        console.log("USER_WALLET:");
        console.log(wallet);
        return wallet;
    }

    async deleteWalletByUser(user: User): Promise<void> {
        await WalletModel.deleteMany({ owner: user.id });
    }

    private get model(): Model<Wallet> {
        return WalletModel;
    }

    async getWalletById(id: string): Promise<Wallet> {
        const wallet: Wallet = await WalletModel.findOne({id});
        return wallet;
    }
    
    async addWallet(user: User, currencySymbol: string): Promise<Wallet> {
        const wallet: Wallet = await new WalletModel({ owner: user.id, currency: currencySymbol }).save();
        console.log(wallet);
        return wallet;
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

export default new WalletRepoImpl();