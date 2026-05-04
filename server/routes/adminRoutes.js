// routes/adminRoutes.js
// All admin routes require: protect (valid JWT) + adminOnly (role === "admin").
// Double-guarded so a normal user with a valid token is still rejected.

import express from "express";
import {
  getAllUsers,
  deleteUser,
  getAllCarsAdmin,
  getAllBookingsAdmin
} from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Apply both guards to every admin route
router.use(protect, adminOnly);

// GET    /api/admin/users        — list all registered users
router.get("/users", getAllUsers);

// DELETE /api/admin/user/:id     — delete a user by ID
router.delete("/user/:id", deleteUser);

// GET    /api/admin/cars         — list all car listings with seller details
router.get("/cars", getAllCarsAdmin);

// GET    /api/admin/bookings     — list all bookings
router.get("/bookings", getAllBookingsAdmin);

export default router;
