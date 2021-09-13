"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafka_1 = require("../kafka");
const credit_wallet_req_msg_1 = require("../processors/messages/credit-wallet-req-msg");
const wallet_credit_request_repo_impl_1 = require("../repos/wallet-credit-request-repo-impl");
const wallet_service_impl_1 = require("../services/wallet-service-impl");
const topics_1 = require("../topics");
const fundWallet = async (req, res) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    try {
        const user = req.user;
        console.log("USER: " + user);
        const { amount, cardDetails, currency } = req.body;
        if (!currency) {
            throw Error("currency of wallet not provided");
        }
        // if(!cardDetails){
        //     throw Error("cardDetails not provided")
        // }
        // const cardDetailsFields = [
        //     "cardNo",
        //     "cardUsername",
        //     "cardCVV",
        //     "cardPIN",
        //     "cardExp"
        // ]
        // for(let deets of cardDetailsFields){
        //     if(!cardDetails[deets]){
        //         throw Error(`'${deets}' not provided in cardDetails`);
        //     }
        // }
        const wallet = await wallet_service_impl_1.default.getWallet(user, currency);
        const credWalletRequest = await wallet_credit_request_repo_impl_1.default.creditWallet(wallet.id, amount, cardDetails, currency);
        (await kafka_1.KafkaService.getInstance()).producer.send({ topic: topics_1.WALLET_CREDIT_FUNDS_REQUEST_TOPIC, messages: [
                { key: "", value: new credit_wallet_req_msg_1.CreditWalletReqMessage({
                        walletUserId: req.user.id,
                        amount,
                        walletId: wallet.id,
                        cardNo: (_b = (_a = cardDetails) === null || _a === void 0 ? void 0 : _a.cardNo, (_b !== null && _b !== void 0 ? _b : "")),
                        cardUsername: (_d = (_c = cardDetails) === null || _c === void 0 ? void 0 : _c.cardUsername, (_d !== null && _d !== void 0 ? _d : "")),
                        cardCVV: (_f = (_e = cardDetails) === null || _e === void 0 ? void 0 : _e.cardCVV, (_f !== null && _f !== void 0 ? _f : "")),
                        cardPIN: (_h = (_g = cardDetails) === null || _g === void 0 ? void 0 : _g.cardPIN, (_h !== null && _h !== void 0 ? _h : "")),
                        cardExp: (_k = (_j = cardDetails) === null || _j === void 0 ? void 0 : _j.cardExp, (_k !== null && _k !== void 0 ? _k : "")),
                        requestId: credWalletRequest.id,
                        email: (_m = (_l = cardDetails) === null || _l === void 0 ? void 0 : _l.email, (_m !== null && _m !== void 0 ? _m : "")),
                        currency
                    }).serialize() }
            ] });
        res.json({
            data: credWalletRequest
        });
    }
    catch (e) {
        res.status(500).json({
            status: "failure",
            message: e.message
        });
    }
};
exports.default = {
    fundWallet
};
//# sourceMappingURL=wallet-funding.js.map