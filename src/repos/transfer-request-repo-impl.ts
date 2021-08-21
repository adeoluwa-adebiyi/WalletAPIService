import { Document } from "mongoose";
import  Transfer from "../db/models/transfers";
import walletTransfer from "../db/models/walletTransfer";
import { WalletTransferMoneyMessageParams } from "../processors/messages/wallet-transfer-money-message";
import { WalletTransferRequest } from "../services/interfaces/wallet-service";
import { ITransferRequestRepo, TransferDocument } from "./interfaces/transfer-request-repo";

export class TransferRequestRepo implements ITransferRequestRepo{

    async createWalletTransferRequest(request: WalletTransferRequest): Promise<any> {
        return await new walletTransfer(request).save();
    }

}

export default new TransferRequestRepo();