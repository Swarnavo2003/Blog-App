import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import Like from "../models/like.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

export const addComment = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
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

  const newComment = await Comment.create({
    content,
    author: userId,
    blog: blogId,
  });

  await blog.updateOne({
    $push: { comments: newComment._id },
  });

  return res.status(200).json(new ApiResponse(200, null, "Your comment added"));
});

export const togglelikeComment = asyncHandler(async (req, res, next) => {
  const userId = req.id;
  const commentId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "No user with this userId exists");
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(404, "No comment with this userId exists");
  }

  const existingLike = await Like.findOne({
    user: userId,
    target: "comment",
    targetId: commentId,
  });

  let message;

  if (existingLike) {
    // dislike comment
    await comment.updateOne({
      $pull: { like: existingLike._id },
    });

    comment.totalLikes = comment.totalLikes - 1;
    await comment.save();

    await Like.deleteOne({
      user: userId,
      target: "comment",
      targetId: commentId,
    });

    message = "You disliked the comment";
  } else {
    // Like comment
    const newLike = await Like.create({
      user: userId,
      target: "comment",
      targetId: commentId,
    });

    await comment.updateOne({
      $push: { like: newLike._id },
    });
    comment.totalLikes = comment.totalLikes + 1;
    await comment.save();

    message = "You liked the comment";
  }

  return res.status(200).json(new ApiResponse(200, null, message));
});

export const getComments = asyncHandler(async (req, res, next) => {
  const userId = req.id;
  const blogId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "No user with this userId exists");
  }

  const comment = await Comment.find({ blog: blogId });

  return res.status(200).json(new ApiResponse(200, comment, null));
});
