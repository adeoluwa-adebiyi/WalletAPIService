import * as dotenv from "dotenv";

dotenv.config();

export default{
    APP_SECRET:null,
    DB_TYPE: null,
    DB_HOST: null,
    DB_USER: null,
    DB_PASSWORD: null,
    DB_NAME: null,
    DB_PORT: null,
    DB_URL: null,
    PORT:null,
    ...process.env
}