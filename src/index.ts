import config from "./config";
import "reflect-metadata";
import app from "./app";
import { connect } from "./db/connection";
import { Consumer, EachBatchPayload, Kafka } from "kafkajs";
import * as topics from "./topics";
import { WALLET_API_SERVICE } from "./constants";

connect().then(async connection => {

    console.log("STARTING SERVER");

    try{
        app.listen(parseInt(config.PORT), ()=>{
            console.log("SERVER LISTENING SUCCESSFULLY");
        });
    }catch(e){
        console.log("SERVER LISTENING ERROR:");
        console.log(e);
    }

    console.log("STARTING PROCESSORS");

    const kafka: Kafka = new Kafka({
        clientId: "wallet-service",
        brokers: [
            config.KAFKA_BOOTSTRAP_SERVER
        ]
    });

    const consumer: Consumer = kafka.consumer({
        groupId: WALLET_API_SERVICE,
    })

    await consumer.connect();

    await consumer.subscribe({ topic: topics.WALLET_CREDIT_FUNDS_REQUEST_TOPIC, });

    await consumer.run({
        eachBatch: async(payload: EachBatchPayload) => {
            for (let message of payload.batch.messages){
                console.log(message);
            }
        }
    })


}).catch(error => console.log(error));
