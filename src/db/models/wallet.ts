import { model, Document } from "mongoose";
import walletSchema from "../schemas/wallet";


export interface Wallet extends Document<any> {
    id?: number;

    owner: string;

    balance?: number;

    currency: string;

}

export default model<Wallet>("wallet", walletSchema);