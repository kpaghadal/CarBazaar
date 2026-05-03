// controllers/authController.js
// Handles user registration and login.
// Passwords are hashed with bcrypt before saving.
// A signed JWT is returned on success; the frontend stores it and sends it
// as Authorization: Bearer <token> on protected requests.

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Helper: generate a signed JWT valid for 7 days
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// ─── POST /api/auth/register ───────────────────────────────────────────────
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please provide name, email, and password");
    }

    // Check if email is already taken
    const exists = await User.findOne({ email });
    if (exists) {
      res.status(400);
      throw new Error("Email already registered");
    }

    // Hash the password (salt rounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

// ─── POST /api/auth/login ──────────────────────────────────────────────────
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide email and password");
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    // Compare submitted password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};
