import { model, Document } from "mongoose";
import walletSchema from "../schemas/wallet";


export interface Wallet extends Document<any> {
    id?: String;

    owner: String;

    balance?: Number;

    currency: String;

}

export default model<Wallet>("wallet", walletSchema);