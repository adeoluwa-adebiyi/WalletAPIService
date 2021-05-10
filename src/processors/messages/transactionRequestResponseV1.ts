import Record from "dataclass";
import { Message } from "./interface/message";

export class TransactionRequestResponseV1 extends Record<TransactionRequestResponseV1> implements Message {

    version: String = "1";

    name: String = "TransactionRequestResponse";

    entityId: String;

    amount: Number;

    type: "inflow" | "outflow" | "inflow" | "recharge";

    sourceWallet: String;

    destinationWallet: String;

    requestee: String;

    status: "pending" | "failed" | "success";

    time: Number;

    getVersion(): String {
        return this.version;
    }

    getKey(): String {
        return `${this.name}:${this.version}`;
    }
}