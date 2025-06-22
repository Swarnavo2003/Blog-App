import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  addComment,
  deleteComment,
  getComments,
  togglelikeComment,
  updateComment,
} from "../controllers/comment.controller.js";

const commentRouter = Router();

commentRouter.post("/:id", isAuthenticated, addComment);
commentRouter.post("/:id/like", isAuthenticated, togglelikeComment);
commentRouter.get("/:id/all", isAuthenticated, getComments);
commentRouter.put("/:id/update", isAuthenticated, updateComment);
commentRouter.delete("/:id/delete", isAuthenticated, deleteComment);

export default commentRouter;
