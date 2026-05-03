// controllers/carController.js
// Manages car listings — browse all, browse by type, create, and delete.
// GET routes are public. POST and DELETE require a valid JWT.
// Only the car's seller OR an admin can delete a listing.

import Car from "../models/Car.js";
import { sendEmail, isMailConfigured } from "../utils/mailer.js";

function parseStringList(val) {
  if (Array.isArray(val)) return val.map(String).map((s) => s.trim()).filter(Boolean);
  if (typeof val === "string" && val.trim())
    return val
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
  return [];
}

// ─── GET /api/cars ─────────────────────────────────────────────────────────
// Returns all cars, newest first, with seller name/email populated.
export const getAllCars = async (req, res, next) => {
  try {
    const cars = await Car.find()
      .populate("seller", "name email")
      .sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/cars/new ────────────────────────────────────────────────────
// Returns only cars listed as type: "new".
export const getNewCars = async (req, res, next) => {
  try {
    const cars = await Car.find({ type: "new" })
      .populate("seller", "name email")
      .sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/cars/old ────────────────────────────────────────────────────
// Returns only cars listed as type: "old" (user-to-user marketplace).
export const getOldCars = async (req, res, next) => {
  try {
    const cars = await Car.find({ type: "old" })
      .populate("seller", "name email")
      .sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/cars/:id ────────────────────────────────────────────────────
// Returns a single car by its MongoDB _id with seller info populated.
export const getCarById = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id).populate("seller", "name email phone");
    if (!car) {
      res.status(404);
      throw new Error("Car not found");
    }
    res.json(car);
  } catch (error) {
    next(error);
  }
};

// ─── POST /api/cars ────────────────────────────────────────────────────────
// Creates a new car listing. The logged-in user becomes the seller.
export const createCar = async (req, res, next) => {
  try {
    const {
      name,
      brand,
      price,
      image,
      images,
      description,
      type,
      year,
      mileage,
      fuelType,
      location,
      features,
      transmission,
      bodyType,
      color,
    } = req.body;

    if (!name || !brand || !price || !type) {
      res.status(400);
      throw new Error("name, brand, price, and type are required");
    }

    let imageList = parseStringList(images);
    const primary = (image || "").trim();
    if (primary && !imageList.length) imageList = [primary];
    if (primary && imageList.length && !imageList.includes(primary)) imageList = [primary, ...imageList];

    const cover = primary || imageList[0] || "";

    const car = await Car.create({
      name,
      brand,
      price,
      image: cover,
      images: imageList.length ? imageList : cover ? [cover] : [],
      description: description || "",
      type,
      year: Number(year) || 0,
      mileage: Number(mileage) || 0,
      fuelType: fuelType || "Gasoline",
      location: location || "",
      features: parseStringList(features),
      transmission: transmission || "Automatic",
      bodyType: bodyType || "Sedan",
      color: color || "",
      seller: req.user._id,
    });

    const populated = await Car.findById(car._id).populate("seller", "name email");

    if (type === "old" && req.user?.email && isMailConfigured()) {
      try {
        const priceLabel = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(Number(price));
        const listingUrl =
          process.env.CLIENT_URL && car._id
            ? `${process.env.CLIENT_URL.replace(/\/$/, "")}/old/${car._id}`
            : null;
        const lines = [
          `Hi ${req.user.name},`,
          "",
          `Your used car listing is now live on CarBazaar.`,
          "",
          `Vehicle: ${name}`,
          `Brand: ${brand}`,
          `Asking price: ${priceLabel}`,
          listingUrl ? `View your listing: ${listingUrl}` : null,
          "",
          "Buyers can find your car on the marketplace. Watch your inbox for messages and booking updates.",
          "",
          "— CarBazaar",
        ].filter(Boolean);
        await sendEmail(
          req.user.email,
          "Your used car listing is live — CarBazaar",
          lines.join("\n")
        );
      } catch (mailErr) {
        console.error("Used-car listing confirmation email failed:", mailErr.message);
      }
    }

    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
};

// ─── PUT /api/cars/:id ─────────────────────────────────────────────────────
// Updates a listing. Seller or admin only.
export const updateCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      res.status(404);
      throw new Error("Car not found");
    }

    const isOwner = car.seller.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      res.status(403);
      throw new Error("Not authorized to update this listing");
    }

    const {
      name,
      brand,
      price,
      image,
      images,
      description,
      type,
      year,
      mileage,
      fuelType,
      location,
      features,
      transmission,
      bodyType,
      color,
    } = req.body;

    if (name !== undefined) car.name = name;
    if (brand !== undefined) car.brand = brand;
    if (price !== undefined) car.price = Number(price);
    if (description !== undefined) car.description = description;
    if (type !== undefined) car.type = type;
    if (year !== undefined) car.year = Number(year) || 0;
    if (mileage !== undefined) car.mileage = Number(mileage) || 0;
    if (fuelType !== undefined) car.fuelType = fuelType;
    if (location !== undefined) car.location = location;
    if (transmission !== undefined) car.transmission = transmission;
    if (bodyType !== undefined) car.bodyType = bodyType;
    if (color !== undefined) car.color = color;

    if (images !== undefined || image !== undefined) {
      let imageList = images !== undefined ? parseStringList(images) : [...(car.images || [])];
      const primary = image !== undefined ? String(image).trim() : (car.image || "").trim();
      if (primary && !imageList.length) imageList = [primary];
      if (primary && imageList.length && !imageList.includes(primary)) imageList = [primary, ...imageList];
      car.image = primary || imageList[0] || "";
      car.images = imageList.length ? imageList : car.image ? [car.image] : [];
    }

    if (features !== undefined) car.features = parseStringList(features);

    await car.save();
    const updated = await Car.findById(car._id).populate("seller", "name email");
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// ─── DELETE /api/cars/:id ──────────────────────────────────────────────────
// Deletes a car. Only the seller who created it or an admin can delete it.
export const deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      res.status(404);
      throw new Error("Car not found");
    }

    // Allow if the requesting user is the seller OR an admin
    const isOwner = car.seller.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      res.status(403);
      throw new Error("Not authorized to delete this listing");
    }

    await car.deleteOne();
    res.json({ message: "Car listing deleted successfully" });
  } catch (error) {
    next(error);
  }
};
