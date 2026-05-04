// routes/booking.js
import express from "express";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import { sendEmail, isMailConfigured } from "../utils/mailer.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// POST /api/bookings — Book a car
router.post("/", protect, async (req, res) => {
  try {
    const { carId, phone, appointmentDate, message } = req.body;
    const userId = req.user._id;

    // Check if car exists
    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: "Car not found" });

    // Prevent double booking
    const existing = await Booking.findOne({ car: carId });
    if (existing) {
      return res.status(400).json({ message: "Car is already booked" });
    }

    if (!phone || !appointmentDate) {
      return res.status(400).json({ message: "Phone and Appointment Date are required." });
    }

    // Create booking
    const booking = await Booking.create({ 
      car: carId, 
      user: userId,
      phone,
      appointmentDate,
      message
    });

    // Update car availability (using strict: false in case it is not in schema)
    await Car.findByIdAndUpdate(carId, { isAvailable: false }, { strict: false });

    // Get user details for email
    const user = await User.findById(userId);

    const dateStr = new Date(appointmentDate).toLocaleString();

    if (isMailConfigured()) {
      try {
        await sendEmail(
          user.email,
          "Booking Confirmed — CarBazaar",
          `Hi ${user.name},\n\nYour booking for "${car.name}" (${car.brand}) has been confirmed!\n\nAppointment Details:\nDate: ${dateStr}\nPhone: ${phone}\n\nThank you for using CarBazaar.`
        );
        await sendEmail(
          process.env.EMAIL,
          "New Car Booking — CarBazaar",
          `New booking received!\n\nCar: ${car.name} (${car.brand})\nBooked by: ${user.name} (${user.email})\nPhone: ${phone}\nDate: ${dateStr}\nMessage: ${message || "N/A"}\nBooking ID: ${booking._id}`
        );
      } catch (mailErr) {
        console.error("Booking email failed:", mailErr.message);
      }
    }

    res.status(201).json({ message: "Car booked successfully", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/bookings/my — Get logged-in user's bookings
router.get("/my", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("car");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
