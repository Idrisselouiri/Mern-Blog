import express from "express";
import { signin, login } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/sign-in", signin);
router.post("/log-in", login);

export default router;
