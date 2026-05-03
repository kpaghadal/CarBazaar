// controllers/userController.js
// Handles viewing and updating the logged-in user's profile.
// Both routes are protected — req.user is set by the auth middleware.

import User from "../models/User.js";

// ─── GET /api/users/profile ────────────────────────────────────────────────
// Returns the current user's profile (password field excluded via select).
export const getProfile = async (req, res, next) => {
  try {
    // req.user is already populated by protect middleware (minus password)
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};

// ─── PUT /api/users/profile ────────────────────────────────────────────────
// Allows the user to update name, profileImage, or password.
// If a new password is provided it is re-hashed before saving.
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Update only fields that were sent
    user.name = req.body.name || user.name;
    user.profileImage = req.body.profileImage || user.profileImage;

    // If a new password is provided, hash it
    if (req.body.password) {
      const bcrypt = await import("bcryptjs");
      user.password = await bcrypt.default.hash(req.body.password, 10);
    }

    const updated = await user.save();

    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      profileImage: updated.profileImage,
    });
  } catch (error) {
    next(error);
  }
};
