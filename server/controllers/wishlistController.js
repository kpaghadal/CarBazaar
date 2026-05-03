// controllers/wishlistController.js
// Users can save cars they are interested in.
// Each (user, car) pair is unique — duplicates return a 400 error.

import Wishlist from "../models/Wishlist.js";

// ─── POST /api/wishlist/add ────────────────────────────────────────────────
// Adds a car to the authenticated user's wishlist.
export const addToWishlist = async (req, res, next) => {
  try {
    const { carId } = req.body;

    if (!carId) {
      res.status(400);
      throw new Error("carId is required");
    }

    // Check for duplicates manually to return a friendly message
    const existing = await Wishlist.findOne({
      user: req.user._id,
      car: carId,
    });

    if (existing) {
      return res.status(400).json({ message: "Car already in wishlist" });
    }

    const item = await Wishlist.create({ user: req.user._id, car: carId });
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/wishlist/:userId ─────────────────────────────────────────────
// Returns all wishlist items for a given userId with car details populated.
// The logged-in user can only fetch their own wishlist (unless they are admin).
export const getWishlist = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Only allow the user themselves or an admin to view a wishlist
    const isSelf = req.user._id.toString() === userId;
    const isAdmin = req.user.role === "admin";

    if (!isSelf && !isAdmin) {
      res.status(403);
      throw new Error("Access denied");
    }

    const items = await Wishlist.find({ user: userId }).populate(
      "car",
      "name brand price image type"
    );

    res.json(items);
  } catch (error) {
    next(error);
  }
};

// ─── DELETE /api/wishlist/:carId ───────────────────────────────────────────
// Removes a specific car from the authenticated user's wishlist.
export const removeFromWishlist = async (req, res, next) => {
  try {
    const deleted = await Wishlist.findOneAndDelete({
      user: req.user._id,
      car: req.params.carId,
    });

    if (!deleted) {
      res.status(404);
      throw new Error("Wishlist item not found");
    }

    res.json({ message: "Removed from wishlist" });
  } catch (error) {
    next(error);
  }
};
