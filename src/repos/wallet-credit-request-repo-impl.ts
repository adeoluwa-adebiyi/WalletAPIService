import WalletCreditRequest from "../db/models/walletCreditRequest";
import { CardDetails } from "../services/interfaces/wallet-service";
import { WalletCreditRequestRepo } from "./interfaces/wallet-credit-requests-repo";

class WalletCreditRequestRepoImpl implements WalletCreditRequestRepo{
    
    async creditWallet(walletId: String, amount: Number, cardDeets: CardDetails, currency: String) {
        return await WalletCreditRequest.create({
            walletId,
            amount,
            currency,
            cardData: cardDeets
        });
    }

}

export default new WalletCreditRequestRepoImpl();