"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const constants_1 = require("./constants");
const config_1 = require("../src/config");
class KafkaService {
    constructor() {
        this.kafkaClient = null;
        this.kafkaConsumer = null;
        this.kafkaProducer = null;
    }
    static async getInstance(consumerId = constants_1.WALLET_API_SERVICE) {
        // if(!this.INSTANCE){
        //     this.INSTANCE = new KafkaService();
        //     this.INSTANCE.kafkaClient = new Kafka(<KafkaConfig>{
        //         // clientId: WALLET_API_SERVICE,
        //         brokers: [
        //             config.KAFKA_BOOTSTRAP_SERVER
        //         ]
        //      });
        //     this.INSTANCE.kafkaConsumer = this.INSTANCE.kafkaClient.consumer({
        //         groupId: WALLET_FINANCE_SERVICE
        //     });
        //     this.INSTANCE.kafkaProducer = this.INSTANCE.kafkaClient.producer(<ProducerConfig>{
        //     });
        //     await this.INSTANCE.kafkaConsumer.connect();
        //     await this.INSTANCE.kafkaProducer.connect();
        // }
        const instance = new KafkaService();
        instance.kafkaClient = new kafkajs_1.Kafka({
            // clientId: WALLET_API_SERVICE,
            brokers: [
                config_1.default.KAFKA_BOOTSTRAP_SERVER
            ]
        });
        instance.kafkaConsumer = instance.kafkaClient.consumer({
            groupId: consumerId
        });
        instance.kafkaProducer = instance.kafkaClient.producer({});
        await instance.kafkaConsumer.connect();
        await instance.kafkaProducer.connect();
        return instance;
    }
    get consumer() {
        return this.kafkaConsumer;
    }
    get producer() {
        return this.kafkaProducer;
    }
    getKafkaClient() {
        return this.kafkaClient;
    }
}
exports.KafkaService = KafkaService;
//# sourceMappingURL=kafka.js.map