"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WalletTransferMoneyMessage {
    constructor(params) {
        var _a, _b, _c, _d;
        this.version = "1";
        this.name = "wallet-transfer-money-message";
        this.sourceWalletId = (_a = params) === null || _a === void 0 ? void 0 : _a.sourceWalletId;
        this.destinationWalletId = (_b = params) === null || _b === void 0 ? void 0 : _b.destinationWalletId;
        this.amount = (_c = params) === null || _c === void 0 ? void 0 : _c.amount;
        this.requestId = (_d = params) === null || _d === void 0 ? void 0 : _d.requestId;
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
                sourceWalletId: this.sourceWalletId,
                destinationWalletId: this.destinationWalletId,
                amount: this.amount,
                requestId: this.requestId
            }
        });
    }
    deserialize(json) {
        const obj = JSON.parse(json);
        const data = obj.data;
        this.amount = data.amount;
        this.sourceWalletId = data.sourceWalletId;
        this.destinationWalletId = data.destinationWalletId;
        this.requestId = data.requestId;
        return this;
    }
}
exports.WalletTransferMoneyMessage = WalletTransferMoneyMessage;
//# sourceMappingURL=wallet-transfer-money-message.js.map