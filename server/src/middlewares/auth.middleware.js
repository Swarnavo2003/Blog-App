import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new ApiError(401, "Unauthorized - Login Please");
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  req.id = decoded._id;
  next();
});
