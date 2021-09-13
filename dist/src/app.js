"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("./routes/index");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// import { userSessionMiddleware } from "./midddlewares/userSession";
const app = express();
app.use(cors({
    origin: "*"
}));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
// app.use((req,res, next)=>{
//     console.log("REQ:");
//     console.log(req);
//     next();
// });
app.use("/", index_1.default.homeRoutes);
app.use("/wallet", index_1.default.walletRoutes);
app.use("/transfer", index_1.default.transferRoutes);
app.use(helmet());
exports.default = app;
//# sourceMappingURL=app.js.map