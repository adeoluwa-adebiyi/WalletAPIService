import WalletCreditRequest from "../db/models/walletCreditRequest";
import { CardDetails } from "../services/interfaces/wallet-service";
import { WalletCreditRequestRepo } from "./interfaces/wallet-credit-requests-repo";

class WalletCreditRequestRepoImpl implements WalletCreditRequestRepo{
    
    async creditWallet(walletId: String, amount: Number, cardDeets: CardDetails, currency: String, key: any) {
        return await WalletCreditRequest.create({
            walletId,
            amount,
            currency,
            cardData: cardDeets,
            key
        });
    }

}

export default new WalletCreditRequestRepoImpl();