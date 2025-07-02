import { Router } from "express";
import {
  createBlogs,
  deleteBlogs,
  getAllBlogs,
  getBlogById,
  getFeedBlogs,
  getUserBlogs,
  previewBlog,
  publishBlog,
  toggleLike,
  updateBlogs,
} from "../controllers/blog.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const blogRouter = Router();

blogRouter.get("/all", isAuthenticated, getAllBlogs);
blogRouter.get("/author", isAuthenticated, getUserBlogs);
blogRouter.get("/feed", isAuthenticated, getFeedBlogs);
blogRouter.get("/:id", isAuthenticated, getBlogById);
blogRouter.post("/create", isAuthenticated, createBlogs);
blogRouter.put(
  "/update/:id",
  isAuthenticated,
  upload.fields([{ name: "coverImage", maxCount: 1 }]),
  updateBlogs,
);
blogRouter.delete("/delete/:id", isAuthenticated, deleteBlogs);
blogRouter.post("/:id/like", isAuthenticated, toggleLike);
blogRouter.put("/:id/publish", isAuthenticated, publishBlog);
blogRouter.put("/:id/preview", isAuthenticated, previewBlog);

export default blogRouter;
