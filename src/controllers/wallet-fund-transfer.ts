import { request, Request, Response } from "express";
import WalletService from "../services/wallet-service-impl";
import * as Joi from "joi";
import userRepoImpl from "../repos/user-repo-impl";
import walletRepoImpl from "../repos/wallet-repo-impl";

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