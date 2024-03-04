import express from "express";
import { signin, login, google } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/sign-in", signin);
router.post("/log-in", login);
router.post("/google", google);

export default router;
