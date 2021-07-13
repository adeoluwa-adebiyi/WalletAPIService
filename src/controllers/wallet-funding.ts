import { Request, Response } from "express";
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

        if(!cardDetails){
            throw Error("cardDetails not provided")
        }

        const cardDetailsFields = [
            "cardNo",
            "cardUsername",
            "cardCVV",
            "cardPIN",
            "cardExp"
        ]

        for(let deets of cardDetailsFields){
            if(!cardDetails[deets]){
                throw Error(`'${deets}' not provided in cardDetails`);
            }
        }

        const wallet = await WalletServiceImpl.getWallet(user, currency);
        const credWalletRequest = await WalletCreditRequestRepoImpl.creditWallet(wallet.id, amount, cardDetails, currency);
        (await KafkaService.getInstance()).producer.send({topic:WALLET_CREDIT_FUNDS_REQUEST_TOPIC, messages:[
            {key:"", value:new CreditWalletReqMessage(
                req.user.id,
                amount,
                wallet.id,
                cardDetails.cardNo,
                cardDetails.cardUsername,
                cardDetails.cardCVV,
                cardDetails.cardPIN,
                cardDetails.cardExp
            ).serialize()}
        ]});
        console.log(credWalletRequest);
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