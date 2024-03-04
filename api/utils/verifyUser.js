import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";
export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(404, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, userId) => {
    if (err) {
      return next(errorHandler(404, "Unauthorized"));
    }
    req.user = userId;
    next();
  });
};
