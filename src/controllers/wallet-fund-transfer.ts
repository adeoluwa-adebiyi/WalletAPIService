import { request, Request, Response } from "express";
import WalletService from "../services/wallet-service-impl";
import * as Joi from "joi";

export const transferToWallet = (req:Request, res: Response) => {
    try{

        const { ownerWalletId, userId, amount }  = req.params;
        const schema = Joi.object().keys({
            ownerWalletId: Joi.string().required(),
            userId: Joi.string().required(),
            amount: Joi.string().required()
        });

        const {error, warning, value} = schema.validate(request.body);
        if(error){
            throw Error(error.message)
        }
        if(warning){
            throw Error(warning.message)
        }
        const requestData = WalletService.transferToWallet(ownerWalletId, userId,parseInt(amount));
        res.json({
            status: "success",
            transferRequest: requestData
        });
    }catch(e){
        res.status(500).send({
            errors:[

            ]
        });
    }
}