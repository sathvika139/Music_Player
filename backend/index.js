import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

// ---------- CONFIG ----------
dotenv.config();
const PORT = process.env.PORT || 5000;

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- APP ----------
const app = express();
app.use(cors());
app.use(express.json());

// ---------- DATABASE ----------
connectDB();

// ---------- TEST ROUTE ----------
app.get("/api", (req, res) => {
  res.json({ message: "API root working ✅" });
});

// ---------- AUTH ROUTES ----------
app.use("/api/auth", authRoutes);

// ---------- SONG ROUTES ----------
app.use("/api/songs", songRoutes); // ← CHANGED: Added 's' here

// ---------- 404 HANDLER ----------
app.use((req, res) => {
  res.status(404).json({ message: "Route not found ❌" });
});

// ---------- SERVER ----------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Add this line with your other app.use routes
app.use("/api/favorites", favoriteRoutes);
