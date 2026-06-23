// routes/userRoutes.js
// Protected — require a valid JWT (protect middleware).

import express from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// GET  /api/users/profile — returns the logged-in user's data
// PUT  /api/users/profile — update name, profileImage, or password
router.route("/profile").get(protect, getProfile).put(protect, updateProfile);

export default router;
