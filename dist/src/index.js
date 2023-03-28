"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
require("reflect-metadata");
const app_1 = require("./app");
const connection_1 = require("./db/connection");
const kafkajs_1 = require("kafkajs");
const topics = require("./topics");
const constants_1 = require("./constants");
connection_1.connect().then(async (connection) => {
    console.log("STARTING SERVER");
    try {
        app_1.default.listen(parseInt(config_1.default.PORT), () => {
            console.log("SERVER LISTENING SUCCESSFULLY");
        });
    }
    catch (e) {
        console.log("SERVER LISTENING ERROR:");
        console.log(e);
    }
    console.log("STARTING PROCESSORS");
    const kafka = new kafkajs_1.Kafka({
        clientId: "wallet-service",
        brokers: [
            config_1.default.KAFKA_BOOTSTRAP_SERVER
        ]
    });
    const consumer = kafka.consumer({
        groupId: constants_1.WALLET_API_SERVICE,
    });
    await consumer.connect();
    await consumer.subscribe({ topic: topics.WALLET_CREDIT_FUNDS_REQUEST_TOPIC, });
    await consumer.run({
        eachBatch: async (payload) => {
            for (let message of payload.batch.messages) {
                console.log(message);
            }
        }
    });
}).catch(error => console.log(error));
//# sourceMappingURL=index.js.map