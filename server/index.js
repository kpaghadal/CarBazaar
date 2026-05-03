// index.js — CarBazaar Server Entry Point
// ─────────────────────────────────────────
// Startup order:
//  1. Load environment variables from .env
//  2. Connect to MongoDB Atlas
//  3. Create Express app with JSON + CORS middleware
//  4. Mount all route groups under /api/*
//  5. Attach global error handler (must be last)
//  6. Start listening on PORT (default 5000)

import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import bookingRoutes from "./routes/booking.js";

// Middleware imports
import errorHandler from "./middleware/errorHandler.js";
import { isMailConfigured } from "./utils/mailer.js";

// ── Connect to Database ───────────────────────────────────────────────────
connectDB();

// ── Create Express App ────────────────────────────────────────────────────
const app = express();

// Parse incoming JSON bodies
app.use(express.json());

// Enable Cross-Origin Resource Sharing (allow React frontend on different port)
app.use(cors());

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ── API Routes ────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);       // POST /api/auth/register | /api/auth/login
app.use("/api/users", userRoutes);      // GET|PUT /api/users/profile
app.use("/api/cars", carRoutes);        // GET /api/cars | /new | /old | POST | DELETE /:id
app.use("/api/wishlist", wishlistRoutes); // POST /add | GET /:userId | DELETE /:carId
app.use("/api/chat", chatRoutes);       // POST /start | GET /:chatId | POST /message
app.use("/api/admin", adminRoutes);     // GET /users | DELETE /user/:id | GET /cars
app.use("/api/upload", uploadRoutes);   // POST /api/upload — image upload
app.use("/api/bookings", bookingRoutes); // POST /api/bookings | GET /api/bookings/my

// ── Health Check ─────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "🚗 CarBazaar API is running" });
});

// ── Global Error Handler (must be mounted AFTER all routes) ───────────────
app.use(errorHandler);

// ── Start Server ──────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  if (!isMailConfigured()) {
    console.log("ℹ️  EMAIL/EMAIL_PASS not set — confirmation emails (used car listing, bookings) are disabled");
  }
});
