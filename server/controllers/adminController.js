// controllers/adminController.js
// Admin-only operations — accessed via routes guarded by both protect + adminOnly.
// Admins can view and delete any user (except themselves) and view all car listings.

import User from "../models/User.js";
import Car from "../models/Car.js";

// ─── GET /api/admin/users ──────────────────────────────────────────────────
// Returns a list of all registered users (passwords excluded).
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// ─── DELETE /api/admin/user/:id ────────────────────────────────────────────
// Deletes a user account. Admins cannot delete themselves.
export const deleteUser = async (req, res, next) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      res.status(400);
      throw new Error("Admins cannot delete their own account");
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.json({ message: `User ${user.email} deleted successfully` });
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/admin/cars ────────────────────────────────────────────────────
// Returns all car listings with full seller details for admin review.
export const getAllCarsAdmin = async (req, res, next) => {
  try {
    const cars = await Car.find()
      .populate("seller", "name email role")
      .sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/admin/bookings ───────────────────────────────────────────────
// Returns all bookings globally for the admin, populated with car and user info
export const getAllBookingsAdmin = async (req, res, next) => {
  try {
    const { default: Booking } = await import("../models/Booking.js");
    const bookings = await Booking.find()
      .populate("car", "name brand image price type")
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};
