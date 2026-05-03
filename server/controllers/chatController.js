// controllers/chatController.js
// Manages private 1-to-1 chats between a buyer and a seller.
//
// Flow:
//  1. Buyer calls POST /api/chat/start with sellerId → creates (or returns) a Chat document.
//  2. Either participant calls GET /api/chat/:chatId to read message history.
//  3. Either participant calls POST /api/chat/message to append a new message.

import Chat from "../models/Chat.js";

// ─── POST /api/chat/start ──────────────────────────────────────────────────
// Finds an existing chat between the two users or creates one.
// Prevents creating multiple chat threads for the same pair.
export const startChat = async (req, res, next) => {
  try {
    const { sellerId } = req.body;
    const buyerId = req.user._id;

    if (!sellerId) {
      res.status(400);
      throw new Error("sellerId is required");
    }

    if (sellerId === buyerId.toString()) {
      res.status(400);
      throw new Error("You cannot start a chat with yourself");
    }

    // Check if a chat between these two already exists
    // ($all ensures both IDs are in the participants array)
    let chat = await Chat.findOne({
      participants: { $all: [buyerId, sellerId] },
    });

    if (!chat) {
      chat = await Chat.create({ participants: [buyerId, sellerId] });
    }

    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/chat/:chatId ─────────────────────────────────────────────────
// Returns full message history for a chat.
// Only participants can read the chat.
export const getChat = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.chatId)
      .populate("participants", "name email profileImage")
      .populate("messages.sender", "name profileImage");

    if (!chat) {
      res.status(404);
      throw new Error("Chat not found");
    }

    // Ensure the requesting user is a participant
    const isParticipant = chat.participants.some(
      (p) => p._id.toString() === req.user._id.toString()
    );

    if (!isParticipant) {
      res.status(403);
      throw new Error("Access denied — you are not part of this chat");
    }

    res.json(chat);
  } catch (error) {
    next(error);
  }
};

// ─── POST /api/chat/message ────────────────────────────────────────────────
// Appends a new message to an existing chat thread.
// Only participants can send messages.
export const sendMessage = async (req, res, next) => {
  try {
    const { chatId, text } = req.body;

    if (!chatId || !text) {
      res.status(400);
      throw new Error("chatId and text are required");
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      res.status(404);
      throw new Error("Chat not found");
    }

    // Only participants may send messages
    const isParticipant = chat.participants.some(
      (p) => p.toString() === req.user._id.toString()
    );

    if (!isParticipant) {
      res.status(403);
      throw new Error("Access denied — you are not part of this chat");
    }

    // Push new message sub-document
    chat.messages.push({ sender: req.user._id, text });
    await chat.save();

    // Return only the new message (last element)
    const newMessage = chat.messages[chat.messages.length - 1];
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};
// ─── GET /api/chat ────────────────────────────────────────────────────────
// Returns all chats the current user participates in (for sidebar list).
export const getUserChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({ participants: req.user._id })
      .populate("participants", "name email")
      .sort({ updatedAt: -1 });
    res.json(chats);
  } catch (error) {
    next(error);
  }
};
