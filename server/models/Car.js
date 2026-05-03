// models/Car.js
// Represents a car listing — either a NEW car (added by admin/seller)
// or an OLD car (user-to-user listing).
// seller references the User who created the listing.

import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Car name is required"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    image: {
      type: String,
      default: "", // primary cover URL
    },
    images: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: "",
    },
    features: {
      type: [String],
      default: [],
    },
    transmission: { type: String, default: "Automatic" },
    bodyType: { type: String, default: "Sedan" },
    color: { type: String, default: "" },
    type: {
      type: String,
      enum: ["new", "old"],
      required: [true, "Car type (new/old) is required"],
    },
    year: { type: Number, default: 0 },
    mileage: { type: Number, default: 0 },
    fuelType: { type: String, default: "Gasoline" },
    location: { type: String, default: "" },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Seller reference is required"],
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);
export default Car;
