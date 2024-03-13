import express from "express";
import {
  createComment,
  getComments,
  likeComment,
  editComment,
  deleteComment,
  getAllComments,
} from "../controller/comment.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, createComment);
router.get("/get/:postId", getComments);
router.put("/likeComment/:commentId", verifyUser, likeComment);
router.put("/editComment/:commentId", verifyUser, editComment);
router.delete("/deleteComment/:commentId", verifyUser, deleteComment);
router.get("/getComments", verifyUser, getAllComments);
export default router;
