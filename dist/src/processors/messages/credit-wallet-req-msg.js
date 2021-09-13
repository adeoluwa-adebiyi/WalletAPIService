"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreditWalletReqMessage {
    constructor(params) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        this.version = "1";
        this.name = "credit-wallet-request";
        this.walletUserId = (_a = params) === null || _a === void 0 ? void 0 : _a.walletUserId;
        this.amount = (_b = params) === null || _b === void 0 ? void 0 : _b.amount;
        this.walletId = (_c = params) === null || _c === void 0 ? void 0 : _c.walletId;
        this.cardNo = (_d = params) === null || _d === void 0 ? void 0 : _d.cardNo;
        this.cardUsername = (_e = params) === null || _e === void 0 ? void 0 : _e.cardUsername;
        this.cardCVV = (_f = params) === null || _f === void 0 ? void 0 : _f.cardCVV;
        this.cardPIN = (_g = params) === null || _g === void 0 ? void 0 : _g.cardPIN;
        this.cardExp = (_h = params) === null || _h === void 0 ? void 0 : _h.cardExp;
        this.requestId = (_j = params) === null || _j === void 0 ? void 0 : _j.requestId;
        this.email = (_k = params) === null || _k === void 0 ? void 0 : _k.email;
        this.currency = (_l = params) === null || _l === void 0 ? void 0 : _l.currency;
    }
    getVersion() {
        return this.version;
    }
    getKey() {
        throw new Error("Method not implemented.");
    }
    serialize() {
        return JSON.stringify({
            entityId: this.entityId,
            version: this.version,
            name: this.name,
            data: {
                walletUserId: this.walletUserId,
                walletId: this.walletId,
                amount: this.amount,
                cardNo: this.cardNo,
                cardUsername: this.cardUsername,
                cardCVV: this.cardCVV,
                cardPIN: this.cardPIN,
                cardExp: this.cardExp,
                requestId: this.requestId,
                email: this.email,
                currency: this.currency
            }
        });
    }
    deserialize(json) {
        const obj = JSON.parse(json);
        const data = obj.data;
        this.amount = data.amount;
        this.walletId = data.userId;
        this.walletUserId = data.walletUserId;
        this.cardNo = data.cardNo;
        this.cardUsername = data.cardUsername;
        this.cardCVV = data.cardCVV;
        this.cardPIN = data.cardPIN;
        this.cardExp = data.cardExp;
        this.requestId = data.requestId;
        this.email = data.email;
        this.currency = data.currency;
        return this;
    }
}
exports.CreditWalletReqMessage = CreditWalletReqMessage;
//# sourceMappingURL=credit-wallet-req-msg.js.map