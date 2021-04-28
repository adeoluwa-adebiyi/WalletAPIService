import * as express from "express";
import BaseRoutes from "./routes/index";

const app = express();

app.use("/", BaseRoutes.homeRoutes);


export default app;