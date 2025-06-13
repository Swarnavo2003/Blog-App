import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/api-response.js";
import Like from "../models/like.model.js";

export const getAllBlogs = asyncHandler(async (req, res, next) => {
  const userId = req.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "No user with this userId exists");
  }

  const blogs = await Blog.find({});

  return res.status(200).json(new ApiResponse(200, blogs, `All Blogs Fetched`));
});

export const getFeedBlogs = asyncHandler(async (req, res, next) => {
  const userId = req.id;

  const user = await User.findById(userId).select("following");
  if (!user) {
    throw new ApiError(404, "No user with this userId exists");
  }

  // Aggregation Pipeline

  return res.status(200).json(new ApiResponse(200, {}, "Feed Blogs Fetched"));
});

export const getBlogById = asyncHandler(async (req, res, next) => {
  const userId = req.id;
  const blogId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "No user with this userId exists");
  }

  const blog = await Blog.findById(blogId);

  return res.status(200).json(new ApiResponse(200, blog, `Blog Fetched`));
});

export const createBlogs = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  const userId = req.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "No user with this userId exists");
  }

  if (!title || !description) {
    throw new ApiError(400, "All fields are required");
  }

  const existingBlog = await Blog.findOne({ title });
  if (existingBlog) {
    throw new ApiError(400, "Blog with same title exists");
  }

  const newBlog = await Blog.create({ title, description, author: userId });

  user.blogs.push(newBlog._id);
  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, newBlog, `New Blog Created`));
});

export const updateBlogs = asyncHandler(async (req, res, next) => {});

export const deleteBlogs = asyncHandler(async (req, res, next) => {
  const userId = req.id;
  const blogId = req.params.id;

  const blog = await Blog.findOne({
    _id: blogId,
    author: userId,
  });

  if (!blog) {
    throw new ApiError(404, "No blog with this id exists");
  }

  await Blog.deleteOne({
    _id: blogId,
    author: userId,
  });

  await User.findByIdAndUpdate(userId, {
    $pull: { blogs: blogId },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, `Blog deleted successfully`));
});

export const toggleLike = asyncHandler(async (req, res, next) => {
  const userId = req.id;
  const blogId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "No user with this userId exists");
  }

  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(404, "No blog with this id exists");
  }

  const existingLike = await Like.findOne({
    user: userId,
    target: "blog",
    targetId: blogId,
  });

  let message;
  if (existingLike) {
    // To UnLike
    await Like.deleteOne({
      user: userId,
      target: "blog",
      targetId: blogId,
    });

    await blog.updateOne({
      $pull: { likes: existingLike._id },
    });

    message = `${user.username} unliked the blog`;
  } else {
    // To Like
    const newLike = await Like.create({
      user: userId,
      target: "blog",
      targetId: blogId,
    });

    await blog.updateOne({
      $push: { likes: newLike._id },
    });
    message = `${user.username} liked the blog`;
  }

  return res.status(200).json(new ApiResponse(200, null, message));
});

export const addComment = asyncHandler(async (req, res, next) => {});

export const getComments = asyncHandler(async (req, res, next) => {});
