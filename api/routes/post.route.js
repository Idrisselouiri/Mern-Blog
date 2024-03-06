import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { createPost } from "../controller/post.controller.js";

const router = express.Router();

router.post("/create", verifyUser, createPost);

export default router;
