import { Wallet } from "../db/models/wallet";
import { User } from "../db/models/user";
import { WalletService } from "./interfaces/wallet-service";
import UserRepositoryImpl from "../repos/user-repo-impl";
import WalletRepository from "../repos/wallet-repo-impl"
import { UserRepository } from "../repos/interfaces/user-repo";



class WalletServiceImpl implements WalletService{

    private get userRepo(): UserRepository{
        return UserRepositoryImpl;
    }

    async createUserWallet(userId: string, currency: string="NGN"): Promise<Wallet> {
        console.log(`USERID: ${userId}`);
        const user: User = await this.userRepo.getUserById(userId);
        console.log(`USER: ${user}`);
        return await WalletRepository.addWallet(user, currency);
    }

    deleteWallet(walletId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    creditWallet(walletId: number, amount: number): Promise<number> {
        throw new Error("Method not implemented.");
    }

    debitWallet(walletId: number, amount: number): Promise<number> {
        throw new Error("Method not implemented.");
    }

    obtainWalletBalance(walletId: number): Promise<number> {
        throw new Error("Method not implemented.");
    }

}

export default new WalletServiceImpl();