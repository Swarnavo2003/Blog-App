import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/api-response.js";
import Like from "../models/like.model.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

export const getAllBlogs = asyncHandler(async (req, res, next) => {
  const userId = req.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "No user with this userId exists");
  }

  const blogs = await Blog.find({})
    .populate("comments likes")
    .sort({ createdAt: -1 });

  return res.status(200).json(new ApiResponse(200, blogs, `All Blogs Fetched`));
});

export const getFeedBlogs = asyncHandler(async (req, res, next) => {
  const userId = req.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "No user with this userId exists");
  }

  const feedBlogs = await Blog.find({
    author: { $in: user.following },
    isPublished: true,
  })
    .populate("author")
    .sort({ createdAt: -1 });

  if (!feedBlogs) {
    throw new ApiError(404, "No feedBlogs found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, feedBlogs, "Feed Blogs Fetched"));
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

export const updateBlogs = asyncHandler(async (req, res, next) => {
  const { title, description, content, tags } = req.body;
  const userId = req.id;
  const blogId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const blog = await Blog.findOne({ _id: blogId, author: userId });

  let coverImageUrl;
  if (req.files) {
    console.log(req.files);
    coverImageUrl = req.files.coverImage[0].path;
  }

  if (coverImageUrl) {
    if (blog.coverImage.public_id !== "") {
      await deleteOnCloudinary(blog.coverImage.public_id);
    }

    const result = await uploadOnCloudinary(coverImageUrl, "coverImages");

    blog.coverImage.url = result.secure_url;
    blog.coverImage.public_id = result.public_id;
  }

  if (title) blog.title = title;
  if (description) blog.description = description;
  if (content) {
    blog.content = content;
    blog.readTime = Math.ceil(content.split(" ").length / 100);
  }
  if (tags) blog.tags = tags.split(",").map((tag) => tag.trim());
  await blog.save();

  return res
    .status(200)
    .json(new ApiResponse(200, blog, "Blog updated successfully"));
});

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

export const publishBlog = asyncHandler(async (req, res, next) => {
  const userId = req.id;
  const blogId = req.params.id;

  if (!userId) {
    throw new ApiError(404, "No user with this userId exists");
  }

  if (!blogId) {
    throw new ApiError(404, "No blog with this id exists");
  }

  const blog = await Blog.findOne({ _id: blogId, author: userId });

  if (!blog) {
    throw new ApiError(404, "No blog with this id exists");
  }

  blog.isPublished = !blog.isPublished;
  blog.publishedAt = blog.isPublished ? Date.now() : null;
  await blog.save();

  return res.status(200).json(new ApiResponse(200, blog, `Blog Published`));
});

export const previewBlog = asyncHandler(async (req, res, next) => {
  const userId = req.id;
  const blogId = req.params.id;

  if (!userId) {
    throw new ApiError(404, "No user with this userId exists");
  }

  if (!blogId) {
    throw new ApiError(404, "No blog with this id exists");
  }

  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(404, "No blog with this id exists");
  }

  if (!blog.readers.includes(userId)) {
    blog.readers.push(userId);
    blog.views++;
    await blog.save();
    return res.status(200).json(new ApiResponse(200, null, `Blog Previewed`));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, null, `Blog Already Previewed`));
});
