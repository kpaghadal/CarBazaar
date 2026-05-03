// routes/chatRoutes.js
import express from "express";
import {
  startChat,
  getChat,
  sendMessage,
  getUserChats,
} from "../controllers/chatController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// GET  /api/chat                 — list all chats for current user
router.get("/", protect, getUserChats);

// POST /api/chat/start           — start or find a chat with a seller
router.post("/start", protect, startChat);

// GET  /api/chat/:chatId         — fetch message history
router.get("/:chatId", protect, getChat);

// POST /api/chat/message         — send a message
router.post("/message", protect, sendMessage);

export default router;
