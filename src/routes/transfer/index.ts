import { Router } from "express";
import * as TransferController from "../../controllers/wallet-fund-transfer";

const route: Router = Router();

route.post("/wallet", TransferController.transferToWallet);

export default route;