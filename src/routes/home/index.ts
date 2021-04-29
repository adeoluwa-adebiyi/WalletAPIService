import * as express from "express";
import HomeController from "../../controllers/home";

const router = express.Router();

router.post("/login", HomeController.login);

router.post("/register", HomeController.register);

export default router;