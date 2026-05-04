// routes/authRoutes.js
// Public routes — no JWT required.

import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// POST /api/auth/register — create a new user account
router.post("/register", register);

// POST /api/auth/login — returns JWT on valid credentials
router.post("/login", login);

export default router;
