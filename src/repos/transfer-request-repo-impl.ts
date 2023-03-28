import bankTransfer from "../db/models/bankTransfer";
import walletTransfer from "../db/models/walletTransfer";
import { BankPayoutParams } from "../processors/messages/bank-payout-msg";
import { WalletTransferRequest } from "../services/interfaces/wallet-service";
import { ITransferRequestRepo, TransferDocument } from "./interfaces/transfer-request-repo";

export class TransferRequestRepo implements ITransferRequestRepo{

    async createBankPayout(request: BankPayoutParams): Promise<any> {
        return await new bankTransfer(request).save();
    }

    async createWalletTransferRequest(request: WalletTransferRequest): Promise<any> {
        return await new walletTransfer(request).save();
    }

}

export default new TransferRequestRepo();