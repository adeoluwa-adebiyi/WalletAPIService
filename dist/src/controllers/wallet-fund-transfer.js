"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wallet_service_impl_1 = require("../services/wallet-service-impl");
const Joi = require("joi");
exports.transferToWallet = async (req, res) => {
    try {
        const schema = Joi.object().keys({
            ownerWalletId: Joi.string().required(),
            userId: Joi.string().required(),
            amount: Joi.string().required()
        });
        const { error, warning, value } = schema.validate(express_1.request.body);
        if (error) {
            throw Error(error.message);
        }
        if (warning) {
            throw Error(warning.message);
        }
        const { ownerWalletId, userId, amount } = value;
        const requestData = await wallet_service_impl_1.default.transferToWallet(ownerWalletId, userId, parseInt(amount));
        res.json({
            status: "success",
            transferRequest: requestData
        });
    }
    catch (e) {
        res.status(500).send({
            errors: [
                e.message
            ]
        });
    }
};
//# sourceMappingURL=wallet-fund-transfer.js.map