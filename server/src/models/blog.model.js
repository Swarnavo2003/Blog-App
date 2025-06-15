import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unqiue: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    coverImage: {
      type: {
        url: String,
        public_id: String,
      },
      default: {
        url: "https://placehold.co/600x400",
        public_id: "",
      },
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [{ type: String }],
    isPublished: {
      type: Boolean,
      required: [true, "Is Published is required"],
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    readers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    readTime: {
      type: Number,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
  },
  { timestamps: true },
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
