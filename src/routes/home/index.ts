import * as express from "express";
import HomeController from "../../controllers/home";

const router = express.Router();

router.get("/login", HomeController.login);

router.get("/register", HomeController.register);

export default router;