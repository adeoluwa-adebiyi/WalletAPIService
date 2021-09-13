import { Router } from "express";
import * as TransferController from "../../controllers/wallet-fund-transfer";
import { userAuthenticated, userSessionMiddleware } from "../../midddlewares/userSession";

const route: Router = Router();

route.post("/wallet", [userSessionMiddleware,userAuthenticated],TransferController.transferToWallet);

export default route;