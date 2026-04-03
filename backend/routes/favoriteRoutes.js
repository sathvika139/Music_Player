import express from "express";
import { toggleFavorite } from "../controllers/favoriteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// We use 'protect' because only logged-in users can have favorites
router.post("/toggle", protect, toggleFavorite);

export default router;
