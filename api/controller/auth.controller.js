import User from "../models/user.model.js";
import bcrypjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signin = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    errorHandler(next(404, "All fields are required"));
  }
  const hashPassword = bcrypjs.hashSync(password, 10);
  const user = new User({
    username,
    email,
    password: hashPassword,
  });
  try {
    await user.save();
    res.status(200).json("user has been signin");
  } catch (error) {
    next(error);
  }
};
