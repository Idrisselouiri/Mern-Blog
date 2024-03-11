import express from "express";
import { createComment } from "../controller/comment.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, createComment);

export default router;
