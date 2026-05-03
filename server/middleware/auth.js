// middleware/auth.js
// Verifies the JWT token from the Authorization header (Bearer <token>).
// Attaches the decoded user payload to req.user for downstream controllers.

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // Check for Bearer token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided" });
  }

  try {
    // Verify token and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach full user (minus password) to request
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Not authorized, token invalid or expired" });
  }
};

// Role-based guard — use AFTER protect middleware
// Usage: router.get("/admin/users", protect, adminOnly, handler)
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied — admins only" });
  }
};
