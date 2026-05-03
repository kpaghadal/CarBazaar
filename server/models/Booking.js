// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phone: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
