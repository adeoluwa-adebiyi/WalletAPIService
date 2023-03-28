"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const wallet_repo_impl_1 = require("../../repos/wallet-repo-impl");
const user_1 = require("../models/user");
const wallet_1 = require("../models/wallet");
const wallet_service_impl_1 = require("../../services/wallet-service-impl");
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
        default: () => uuid_1.v4()
    },
    firstName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: [true, "User email is required"],
        unique: true
    },
    passwordHash: {
        type: String,
        required: [true, "User passwordHash is required"]
    },
    lastName: {
        type: String,
        required: false
    },
    dob: {
        type: mongoose_1.Schema.Types.Date,
        required: false
    },
    verified: {
        type: Boolean,
        required: [true, "User verified is required"],
        default: false
    },
    suspended: {
        type: Boolean,
        required: [true, "User suspended is required"],
        default: false
    },
}, {
    timestamps: true
});
userSchema.pre("deleteMany", { document: false, query: true }, async function (next) {
    const docs = await user_1.default.find(this.getFilter());
    const users = docs.map((item) => item.id);
    await wallet_1.default.deleteMany({ owner: { $in: users } });
    next(null);
    // await WalletRepository.deleteWalletByUser(this as User);
});
userSchema.post("save", async (user, next) => {
    console.log("Running post-save hook");
    const wallet = await wallet_repo_impl_1.default.addWallet(user, "NGN");
    await wallet_service_impl_1.default.notifyOnWalletCreation(wallet.id, wallet.owner, wallet.currency);
    wallet && next();
});
exports.default = userSchema;
//# sourceMappingURL=user.js.map