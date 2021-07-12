import { CardDetails } from "../../services/interfaces/wallet-service";

export interface WalletCreditRequestRepo{
    creditWallet(walletId: String, amount: Number, cardDeets: CardDetails, currency: String): any;
}