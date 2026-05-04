// models/Wishlist.js
// Each document ties a single user to a single car.
// Unique compound index prevents duplicate wishlist entries.

import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent a user from adding the same car twice
wishlistSchema.index({ user: 1, car: 1 }, { unique: true });

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;
