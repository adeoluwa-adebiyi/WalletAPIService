import { Request, Response } from "express";
import eventBus from "../bus/event-bus";
import { sendMessage } from "../helpers/messaging";
import { KafkaService } from "../kafka";
import { CreditWalletReqMessage } from "../processors/messages/credit-wallet-req-msg";
import WalletCreditRequestRepoImpl from "../repos/wallet-credit-request-repo-impl";
import WalletServiceImpl from "../services/wallet-service-impl";
import { WALLET_CREDIT_FUNDS_REQUEST_TOPIC } from "../topics";

const fundWallet = async (req: any, res: Response) => {
    try{
        const user = req.user;
        console.log("USER: "+user);
        const { amount, cardDetails, currency } = req.body;

        if (!currency) {
            throw Error("currency of wallet not provided")
        }

        const wallet = await WalletServiceImpl.getWallet(user, currency);
        const credWalletRequest = await WalletCreditRequestRepoImpl.creditWallet(wallet.id, amount, cardDetails, currency);
        const creditWalletMessage = new CreditWalletReqMessage({
            walletUserId: req.user.id,
            amount,
            walletId: wallet.id,
            cardNo: cardDetails?.cardNo ?? "",
            cardUsername: cardDetails?.cardUsername ?? "",
            cardCVV: cardDetails?.cardCVV ?? "",
            cardPIN: cardDetails?.cardPIN ?? "",
            cardExp: cardDetails?.cardExp ?? "",
            requestId: credWalletRequest.id,
            email: cardDetails?.email ?? "",
            currency
        });
        creditWalletMessage.setKey(req.user.id);
        await sendMessage(await eventBus, WALLET_CREDIT_FUNDS_REQUEST_TOPIC, creditWalletMessage);
        res.json({
            data: credWalletRequest
        });
    }catch(e){
        res.status(500).json({
            status: "failure",
            message: e.message
        });
    }
}

export default {
    fundWallet
}