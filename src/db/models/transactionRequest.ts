import { Document, model } from "mongoose";
import transactionRequestSchema from "../schemas/transactionRequest";

export interface TransactionRequest extends Document<TransactionRequest>{

    id?: String,

    amount?: Number;

    type: String;

    destinationWallet?: String;

    sourceWallet: String;

    requestee: String;

    status: String;

}

export default model<TransactionRequest>("transactionRequest",transactionRequestSchema);