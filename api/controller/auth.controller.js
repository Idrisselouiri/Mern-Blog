import User from "../models/user.model.js";
import bcrypjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
    next(errorHandler(404, "All fields are required"));
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
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  const validUser = await User.findOne({ email });
  if (!validUser) {
    return next(errorHandler(404, "User not found"));
  }
  const validPassword = bcrypjs.compareSync(password, validUser.password);
  if (!validPassword) {
    return next(errorHandler(400, "Invalid password"));
  }
  try {
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...infoUser } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(infoUser);
  } catch (error) {
    next(error);
  }
};
