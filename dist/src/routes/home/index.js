"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const home_1 = require("../../controllers/home");
const router = express.Router();
router.post("/login", home_1.default.login);
router.post("/register", home_1.default.register);
exports.default = router;
//# sourceMappingURL=index.js.map