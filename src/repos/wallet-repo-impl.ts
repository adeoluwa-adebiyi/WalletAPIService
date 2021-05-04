import { getRepository, Repository } from "typeorm";
import { Currency } from "../entity/Currency";
import WalletModel, { Wallet } from "../db/models/wallet";
import { User } from "../db/models/user";
import { WalletRepo } from "./interfaces/wallet-repo";
import { Model } from "mongoose";

class WalletRepoImpl implements WalletRepo {

    private get model(): Model<Wallet> {
        return WalletModel;
    }

    getWalletById(id: string): Promise<Wallet> {
        throw new Error("Method not implemented.");
    }
    
    async addWallet(user: User, currencySymbol: string): Promise<Wallet> {
        const currency: Currency = await getRepository(Currency).findOne({ symbol: currencySymbol });
        console.log(user);
        const wallet: Wallet = await new WalletModel({ owner: user, currency }).save();
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