import { Document } from "mongoose";
import Transfer from "../../db/models/transfers";
import { WalletTransferMoneyMessageParams } from "../../processors/messages/wallet-transfer-money-message";
import { WalletTransferRequest } from "../../services/interfaces/wallet-service";


export class TransferDocument extends Document<WalletTransferMoneyMessageParams> implements WalletTransferMoneyMessageParams{
    currency: string;
    sourceWalletId: string;
    destinationWalletId: string;
    amount: number;
    requestId: string;
}

export interface ITransferRequestRepo{
    createWalletTransferRequest(request: WalletTransferRequest): Promise<any>;
}