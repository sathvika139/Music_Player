import express from "express";
import {
  getAllSongs,
  searchSongs,
  getSongById,
} from "../controllers/songController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all songs (temporarily without auth to test)
router.get("/", getAllSongs);

// Search songs
router.get("/search", searchSongs);

// Get song by ID
router.get("/:id", getSongById);

export default router;
