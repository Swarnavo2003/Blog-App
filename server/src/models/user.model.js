import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: [true, "First name is required"],
    },
    lastname: {
      type: String,
      trim: true,
      required: [true, "Last name is required"],
    },
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required"],
      unqiue: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unqiue: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    avatar: {
      type: {
        url: String,
        public_id: String,
      },
      default: {
        url: "https://placehold.co/600x400",
        public_id: "",
      },
    },
    bio: {
      type: String,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    socialLinks: {
      twitter: {
        type: String,
      },
      github: {
        type: String,
      },
      website: {
        type: String,
      },
    },
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    isEmailVerified: {
      type: Boolean,
    },
    emailVerificationToken: {
      type: Number,
    },
    emailVerficationExpiry: {
      type: Date,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d" },
  );
  const tokenExpiry = Date.now() + 24 * 60 * 60 * 1000;
  return { token, tokenExpiry };
};

const User = mongoose.model("User", userSchema);
export default User;
