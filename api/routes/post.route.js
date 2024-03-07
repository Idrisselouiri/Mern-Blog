import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { createPost, getPosts } from "../controller/post.controller.js";

const router = express.Router();

router.post("/create", verifyUser, createPost);
router.get("/getPosts", getPosts);

export default router;
