import { Schema, SchemaType, SchemaTypes } from "mongoose";
import * as uuid from "uuid";

const transferSchema = new Schema({
    id: {
        type: String,
        unique: true,
        default: uuid.v4()
    },
    kind:{
        type: String,
        enum: ["WalletTransferMoney"]
    },
    requestId:{
        type: String,
        unique: true
    },
    data:{
        type: Object,
    }
},{
    timestamps: true
});

export default transferSchema;
