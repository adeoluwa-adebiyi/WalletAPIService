import { Schema } from "mongoose";
import eventBus from "../../bus/event-bus";
import { sendMessage } from "../../helpers/messaging";
import { BankPayoutMessage } from "../../processors/messages/bank-payout-msg";
import { WALLET_TRX_EVENTS_TOPIC } from "../../topics";

const bankTransferSchema = new Schema({
    bankId: {
        type: String,
        required: [true, "nuban cannot be empty"]
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
    await sendMessage(await eventBus, WALLET_TRX_EVENTS_TOPIC, new BankPayoutMessage({
        requestId: doc.requestId,
        bankId: doc.bankId,
        amount: doc.amount,
        destinationAccount: doc.destinationAccount,
        description: doc.description,
        currency: doc.currency
    }));
    doc && next();
});

export default bankTransferSchema;