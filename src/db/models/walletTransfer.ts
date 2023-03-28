import walletTransferSchema  from "../schemas/walletTransfer";
import Transfer  from "./transfer";

export interface WalletTransferRequest{
    sourceWalletId: String;
    destinationWalletId: String;
    amount: Number;
}

export default Transfer.discriminator("WalletTransfer",walletTransferSchema);