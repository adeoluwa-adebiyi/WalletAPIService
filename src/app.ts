import * as express from "express";
import BaseRoutes from "./routes/index";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";


const app = express();

app.use(cors({
    origin: "*"
}))

app.use(helmet());

app.use(express.json());

app.use(cookieParser());

app.use("/", BaseRoutes.homeRoutes);

app.use(helmet());


export default app;