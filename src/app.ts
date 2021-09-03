import * as express from "express";
import BaseRoutes from "./routes/index";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
// import { userSessionMiddleware } from "./midddlewares/userSession";


const app = express();

app.use(cors({
    origin: "*"
}))

app.use(helmet());

app.use((req,res, next)=>{
    console.log("REQ:");
    console.log(req);
    next();
});

app.use(express.json());

app.use(cookieParser());

app.use("/", BaseRoutes.homeRoutes);
app.use("/wallet", BaseRoutes.walletRoutes);
app.use("/transfer", BaseRoutes.transferRoutes);

app.use(helmet());


export default app;