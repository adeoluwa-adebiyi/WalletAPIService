"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wallet_funding_1 = require("../../controllers/wallet-funding");
const userSession_1 = require("../../midddlewares/userSession");
const router = express_1.Router();
router.post("/fund", [userSession_1.userSessionMiddleware, userSession_1.userAuthenticated], wallet_funding_1.default.fundWallet);
exports.default = router;
//# sourceMappingURL=index.js.map