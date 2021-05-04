import { Schema } from "mongoose";

const walletSchema = new Schema({
    id: {
        type: String,
        required: [true, "Wallet id is required"],
        unique: true
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


export default walletSchema;