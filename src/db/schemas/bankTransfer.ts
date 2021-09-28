import { Schema } from "mongoose";
import eventBus from "../../bus/event-bus";
import { sendMessage } from "../../helpers/messaging";
import { BankPayoutMessage } from "../../processors/messages/bank-payout-msg";
import { WALLET_TRX_EVENTS_TOPIC } from "../../topics";
import walletRepoImpl from "../../repos/wallet-repo-impl";
import { createMessage } from "../../utils";

const bankTransferSchema = new Schema({
    sourceWalletId: {
        type: String,
        required: [true, "sourceWalletId cannot be empty"]
    },
    acctName: {
        type: String,
    },
    bankId: {
        type: String,
        required: [true, "nuban cannot be empty"]
    },
    country: {
        type: String,
        required: [true, "country cannot be empty"]
    },
    destinationAccount:{
        type:  String,
        required: [true, "bankAccount cannot be empty"]
    },
    swiftCode: {
        type: String,
    }
});

bankTransferSchema.post<any>("save", async(doc: any, next)=>{
    const wallet = await walletRepoImpl.getWalletById(doc.sourceWalletId);
    const bankTrx = createMessage<BankPayoutMessage,String>(BankPayoutMessage,{
        requestId: doc.requestId,
        bankId: doc.bankId,
        amount: doc.amount,
        destinationAccount: doc.destinationAccount,
        country: doc.country,
        sourceWalletId: doc.sourceWalletId,
        description: doc.description,
        currency: doc.currency,
        acctName: doc.acctName
    }, doc.userId);
    await sendMessage(await eventBus, WALLET_TRX_EVENTS_TOPIC, bankTrx);
    doc && next();
});

export default bankTransferSchema;