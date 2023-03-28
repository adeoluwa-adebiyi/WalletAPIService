import { Router } from "express";
import WalletFundingController from "../../controllers/wallet-funding";
import { userAuthenticated, userSessionMiddleware } from "../../midddlewares/userSession";

const router:Router = Router();

router.post("/fund", [userSessionMiddleware, userAuthenticated], WalletFundingController.fundWallet);

export default router;