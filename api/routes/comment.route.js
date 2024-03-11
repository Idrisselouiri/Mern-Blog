import express from "express";
import {
  createComment,
  getComments,
  likeComment,
} from "../controller/comment.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, createComment);
router.get("/get/:postId", getComments);
router.put("/likeComment/:commentId", verifyUser, likeComment);

export default router;
