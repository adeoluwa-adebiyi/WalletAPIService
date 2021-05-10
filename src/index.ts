import config from "./config";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User, UserSubscriber } from "./entity/User";
import { ENTITIES } from "./entity";
import app from "./app";
import { connect } from "./db/connection";
import { Consumer, EachBatchPayload, Kafka } from "kafkajs";

connect().then(async connection => {

    console.log("STARTING SERVER");
    app.listen(config.PORT);

    console.log("STARTING PROCESSORS");

    const kafka: Kafka = new Kafka({
        clientId: "wallet-service",
        brokers: [
            config.KAFKA_BOOTSTRAP_SERVER
        ]
    });

    const consumer: Consumer = kafka.consumer({
        groupId: "wallet-service",
    })

    await consumer.connect();

    await consumer.subscribe({ topic: "transaction", });

    await consumer.run({
        eachBatch: async(payload: EachBatchPayload) => {
            for (let message of payload.batch.messages){
                console.log(message);
            }
        }
    })


}).catch(error => console.log(error));
