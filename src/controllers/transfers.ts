import { request, Request, Response } from "express";
import WalletService from "../services/wallet-service-impl";
import * as Joi from "joi";
import userRepoImpl from "../repos/user-repo-impl";
import walletRepoImpl from "../repos/wallet-repo-impl";
import { BankPayoutParams } from "../processors/messages/bank-payout-msg";
import walletServiceImpl from "../services/wallet-service-impl";

export const transferToWallet = async (req: any, res: Response) => {
    try {

        const schema = Joi.object().keys({
            username: Joi.string().required(),
            amount: Joi.number().required(),
            currency: Joi.string().required()
        });

        const response = schema.validate(req.body);
        const { error, warning, value } = response;

        if (error) {
            throw Error(error.message);
        }
        if (warning) {
            throw Error(warning.message);
        }

        const { username, amount, currency } = value;


        const user = await userRepoImpl.getUserByUsername(username);

        const ownerWallet = await walletRepoImpl.getUserWallet(req.user.id, currency);

        if (!user) {
            throw Error("destination user does not exist");
        }

        if (user) {
            const requestData = await WalletService.transferToWallet(ownerWallet.id.toString(), user.id, parseInt(amount));
            res.json({
                status: "success",
                transferRequest: requestData
            });
        }
    } catch (e) {
        res.status(500).send({
            errors: [
                e.message
            ]
        });
    }
}

export const transferToBank = async (req:any, res:any) => {
    try{
        const schema = Joi.object().keys({
            bankId: Joi.string().required(),
            amount: Joi.number().required(),
            destinationAccount: Joi.string().required(),
            description: Joi.string().optional(),
            currency: Joi.string().required()
        });
        const validated = schema.validate(req.body);
        const {error, value} = validated;
        if(error){
            throw error;
        }
        const { bankId, amount, destinationAccount, description, currency } = value;
        const wallet = await walletServiceImpl.getWallet(req.user, currency);
        const request = await walletServiceImpl.transferMoney(wallet.id.toString(), amount, <BankPayoutParams>{
            destinationAccount,
            description,
            bankId,
            currency,
            amount
        });
        res.json({
            status: "success",
            data: request
        })
    }catch(e){
        res.status(500).json({
            error: e.message
        })
    }
}
