import { v4 as uuidv4 } from "uuid";
import { Schema, SchemaTypes } from "mongoose";
import key from "./key";

const walletCreditRequestSchema = new Schema({
    ...key,
    requestId: {
        type: String,
        unique:true,
        default: () => uuidv4(),
        required: [true, "requestId required"]
    },
    // status: {
    //     type: String,
    //     enum: ["pending", "success", "failure"],
    //     default: "pending"
    // },
    amount:{
        type: Number,
        required: [true, "amount is required"]
    },
    currency:{
        type: String,
        enum: ["NGN","USD"],
        required: [true, "currency is required"]
    },
    walletId:{
        type: String,
        required: true
    },
    cardData:{
        type: Object
    }
},
{
    timestamps:true   
});

export default walletCreditRequestSchema;