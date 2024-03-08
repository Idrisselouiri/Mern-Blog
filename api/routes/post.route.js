import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  createPost,
  deletePost,
  getPosts,
} from "../controller/post.controller.js";

const router = express.Router();

router.post("/create", verifyUser, createPost);
router.get("/getPosts", getPosts);
router.delete("/delete/:postId/:userId", verifyUser, deletePost);

export default router;
