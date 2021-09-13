import { Schema } from "mongoose";
import { ObjectID } from "typeorm";
import { v4 } from "uuid";
import walletServiceImpl from "../../services/wallet-service-impl";
import { Wallet } from "../models/wallet";

const walletSchema = new Schema({
    id: {
        type: String,
        required: [true, "Wallet id is required"],
        unique: true,
        default: () => v4()
    },

    owner: {
        type: String,
        required: [true, "Wallet owner is required"]
    },

    balance: {
        type: Number,
        required: [true, "Wallet  balance is required"],
        default: 0.00
    },
    
    currency: {
        type: String,
        enum:["NGN", "USD", "EUR"],
        required: [true, "Wallet currency is required"],
        default: "NGN"
    },
}, {
    timestamps: true
});


walletSchema.post<Wallet>("save", async (wallet: Wallet, next) => {
    console.log("Running post-save hook");
    await walletServiceImpl.notifyOnWalletCreation(wallet.id, wallet.owner, wallet.currency);
    wallet && next();
});

export default walletSchema;