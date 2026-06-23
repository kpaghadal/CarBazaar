// routes/wishlistRoutes.js
// All wishlist routes require authentication.

import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// POST   /api/wishlist/add        — add a car to wishlist (body: { carId })
router.post("/add", protect, addToWishlist);

// GET    /api/wishlist/:userId     — get all wishlist items for a user
router.get("/:userId", protect, getWishlist);

// DELETE /api/wishlist/:carId      — remove a car from the logged-in user's wishlist
router.delete("/:carId", protect, removeFromWishlist);

export default router;
