import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { protect } from "../middleware/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "uploads"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// POST /api/upload  — returns { url: "/uploads/filename.jpg" }
router.post("/", protect, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ url: `/uploads/${req.file.filename}` });
});

export default router;
