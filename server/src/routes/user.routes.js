import { Router } from "express";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  toggleFollow,
  updateUser,
} from "../controllers/user.controller.js";
import {
  userLoginValidator,
  userRegistrationValidator,
  userUpdateValidator,
} from "../validations/user.validations.js";
import { validate } from "../middlewares/validator.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.post(
  "/register",
  userRegistrationValidator(),
  validate,
  registerUser,
);

userRouter.post("/login", userLoginValidator(), validate, loginUser);

userRouter.get("/logout", isAuthenticated, logoutUser);

userRouter.get("/profile", isAuthenticated, getProfile);

userRouter.put(
  "/update",
  isAuthenticated,
  userUpdateValidator(),
  validate,
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  updateUser,
);

userRouter.post("/follow/:id", isAuthenticated, toggleFollow);

export default userRouter;
