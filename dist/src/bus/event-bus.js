"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafka_1 = require("../kafka");
class KafkaJSEventBus {
    constructor(client, consumer) {
        this.producer = client;
        this.consumer = consumer;
    }
    async handleMessageBatch(topic, messageHandler) {
        await this.consumer.subscribe({
            topic
        });
        await this.consumer.run({
            autoCommit: false,
            eachBatch: async (payload) => {
                await messageHandler({
                    messages: payload.batch.messages,
                    commitMessageBatch: payload.resolveOffset
                });
            }
        });
    }
    async handleMessage(topic, messageHandler) {
        await this.consumer.subscribe({
            topic
        });
        await this.consumer.run({
            autoCommit: true,
            eachMessage: async (payload) => {
                await messageHandler({
                    message: payload.message,
                });
            },
        });
    }
    async submitRequest(message, topic) {
        await this.producer.send({
            topic,
            messages: [
                {
                    value: message.serialize()
                }
            ]
        });
    }
}
exports.KafkaJSEventBus = KafkaJSEventBus;
let eventBus;
const eventBusInitializer = async () => {
    const kafka = await kafka_1.KafkaService.getInstance();
    eventBus = new KafkaJSEventBus(kafka.producer, kafka.consumer);
    return eventBus;
};
exports.default = eventBusInitializer();
//# sourceMappingURL=event-bus.js.map