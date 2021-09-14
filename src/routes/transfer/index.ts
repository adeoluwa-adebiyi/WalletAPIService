import { Router } from "express";
import * as TransferController from "../../controllers/transfers";
import { userAuthenticated, userSessionMiddleware } from "../../midddlewares/userSession";

const route: Router = Router();

route.post("/wallet", [userSessionMiddleware,userAuthenticated],TransferController.transferToWallet);
route.post("/payout/bank", [userSessionMiddleware,userAuthenticated],TransferController.transferToBank);


export default route;