import WalletModel, { Wallet } from "../db/models/wallet";
import { User } from "../db/models/user";
import { WalletRepo } from "./interfaces/wallet-repo";
import { Model } from "mongoose";

class WalletRepoImpl implements WalletRepo {

    async deleteWalletByUser(user: User): Promise<void> {
        await WalletModel.deleteMany({ owner: user.id });
    }

    private get model(): Model<Wallet> {
        return WalletModel;
    }

    getWalletById(id: string): Promise<Wallet> {
        throw new Error("Method not implemented.");
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