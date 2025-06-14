import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  addComment,
  getComments,
  togglelikeComment,
} from "../controllers/comment.controller.js";

const commentRouter = Router();

commentRouter.post("/:id", isAuthenticated, addComment);
commentRouter.post("/:id/like", isAuthenticated, togglelikeComment);
commentRouter.get("/:id/all", isAuthenticated, getComments);

export default commentRouter;
