import { request, Request, Response } from "express";
import WalletService from "../services/wallet-service-impl";
import * as Joi from "joi";

export const transferToWallet = async(req:Request, res: Response) => {
    try{

        const schema = Joi.object().keys({
            ownerWalletId: Joi.string().required(),
            userId: Joi.string().required(),
            amount: Joi.string().required()
        });

        const {error, warning, value} = schema.validate(request.body);
        if(error){
            throw Error(error.message);
        }
        if(warning){
            throw Error(warning.message);
        }
        const { ownerWalletId, userId, amount }  = value;

        const requestData = await WalletService.transferToWallet(ownerWalletId, userId,parseInt(amount));
        res.json({
            status: "success",
            transferRequest: requestData
        });
    }catch(e){
        res.status(500).send({
            errors:[
                e.message
            ]
        });
    }
}