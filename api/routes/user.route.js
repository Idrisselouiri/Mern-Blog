import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { update } from "../controller/user.controller.js";

const router = express.Router();

router.put("/update/:id", verifyUser, update);

export default router;
