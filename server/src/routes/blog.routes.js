import { Router } from "express";
import {
  addComment,
  createBlogs,
  deleteBlogs,
  getAllBlogs,
  getBlogById,
  getComments,
  getFeedBlogs,
  toggleLike,
  updateBlogs,
} from "../controllers/blog.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const blogRouter = Router();

blogRouter.get("/all", isAuthenticated, getAllBlogs);
blogRouter.get("/feed", isAuthenticated, getFeedBlogs);
blogRouter.get("/:id", isAuthenticated, getBlogById);
blogRouter.post("/create", isAuthenticated, createBlogs);
blogRouter.put("/update/:id", isAuthenticated, updateBlogs);
blogRouter.delete("/delete/:id", isAuthenticated, deleteBlogs);
blogRouter.post("/like/:id", isAuthenticated, toggleLike);
blogRouter.post("/comment/:id", isAuthenticated, addComment);
blogRouter.get("/comments", isAuthenticated, getComments);

export default blogRouter;
