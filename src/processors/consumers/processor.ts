import { Deserializer } from "../deserializers/interface/deserializer";
import { Message } from "../messages/interface/message";
import { MessageHandler } from "../messageHandlers/interfaces/messageHandler";

export interface Processor<T extends Message>{

    getDeserializer(): Deserializer;

    register();

    getProcessor(message: T): MessageHandler<T>;

    processMessage(message: T);
}

