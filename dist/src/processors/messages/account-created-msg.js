"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WalletCreatedMessage {
    constructor(params) {
        var _a, _b, _c;
        this.version = "1";
        this.name = "wallet-created";
        this.walletId = (_a = params) === null || _a === void 0 ? void 0 : _a.walletId;
        this.userId = (_b = params) === null || _b === void 0 ? void 0 : _b.userId;
        this.currency = (_c = params) === null || _c === void 0 ? void 0 : _c.currency;
    }
    getVersion() {
        throw new Error("Method not implemented.");
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
                userId: this.userId,
                walletId: this.walletId,
                currency: this.currency
            }
        });
    }
    deserialize(json) {
        const obj = JSON.stringify(json);
        const { data } = obj;
        this.name = obj.name;
        this.version = obj.version;
        this.userId = data.userId;
        this.walletId = data.walletId;
        this.currency = data.currency;
        return this;
    }
}
exports.WalletCreatedMessage = WalletCreatedMessage;
//# sourceMappingURL=account-created-msg.js.map