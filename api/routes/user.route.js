import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  updateUser,
  deleteUser,
  signoutUser,
  getUsers,
  getUser,
} from "../controller/user.controller.js";

const router = express.Router();

router.put("/update/:id", verifyUser, updateUser);
router.delete("/delete/:id", verifyUser, deleteUser);
router.get("/signout", signoutUser);
router.get("/getUsers", verifyUser, getUsers);
router.get("/:userId", getUser);

export default router;
