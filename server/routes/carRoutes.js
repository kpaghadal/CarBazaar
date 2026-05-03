// routes/carRoutes.js
// GET routes are public (anyone can browse).
// POST and DELETE require a valid JWT (protect middleware).

import express from "express";
import {
  getAllCars,
  getNewCars,
  getOldCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} from "../controllers/carController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// GET  /api/cars       — all cars
// POST /api/cars       — create a new listing (protected)
router.route("/").get(getAllCars).post(protect, createCar);

// GET /api/cars/new — only type:"new" listings (public)
router.get("/new", getNewCars);

// GET /api/cars/old — only type:"old" listings (public)
router.get("/old", getOldCars);

// GET /api/cars/:id — single car (public)
// PUT /api/cars/:id — update (seller or admin)
// DELETE /api/cars/:id — remove (seller or admin)
// IMPORTANT: must be declared AFTER /new and /old
router.route("/:id").get(getCarById).put(protect, updateCar).delete(protect, deleteCar);

export default router;
