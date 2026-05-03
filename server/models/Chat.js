// models/Chat.js
// A Chat document is created once per buyer-seller pair.
// Messages are stored as an embedded array (sub-documents) within the chat,
// which is efficient for private 1-to-1 conversations.

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } // gives each message its own createdAt timestamp
);

const chatSchema = new mongoose.Schema(
  {
    // exactly two participants: [buyerId, sellerId]
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [messageSchema],
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
