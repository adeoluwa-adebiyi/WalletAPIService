import { Router } from "express";
import WalletController from "../../controllers/wallet";
import { userAuthenticated, userSessionMiddleware } from "../../midddlewares/userSession";

const router: Router = Router();

router.get("/", [userSessionMiddleware, userAuthenticated], WalletController.getWallets);

export default router;