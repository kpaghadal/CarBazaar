// models/User.js
// Represents a registered user or admin.
// password is stored as a bcrypt hash (hashing is done in the auth controller).
// role defaults to "user"; admins are manually set or via a seeder.

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profileImage: {
      type: String,
      default: "", // URL to profile image
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

const User = mongoose.model("User", userSchema);
export default User;
