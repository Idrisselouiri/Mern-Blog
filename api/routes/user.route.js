import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  updateUser,
  deleteUser,
  signoutUser,
} from "../controller/user.controller.js";

const router = express.Router();

router.put("/update/:id", verifyUser, updateUser);
router.delete("/delete/:id", verifyUser, deleteUser);
router.get("/signout", signoutUser);

export default router;
