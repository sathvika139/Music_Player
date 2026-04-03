import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import "./config/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
const app = express();

// ---------- CONFIG ----------
dotenv.config();
const PORT = process.env.PORT || 5000;

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- APP ----------
//const cors = require("cors");

app.use(
  cors({
    origin: [
      "import.meta.env.VITE_API_BASE_URL",
      "https://music-player-six-drab.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());
// ---------- DATABASE ----------
//connectDB();

// ---------- TEST ROUTE ----------
app.get("/api", (req, res) => {
  res.json({ message: "API root working ✅" });
});

// ---------- AUTH ROUTES ----------
app.use("/api/auth", authRoutes);

// ---------- SONG ROUTES ----------
app.use("/api/songs", songRoutes);

app.use("/api/favorites", favoriteRoutes);

// ---------- 404 HANDLER ----------
app.use((req, res) => {
  res.status(404).json({ message: "Route not found ❌" });
});

// ---------- SERVER ----------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
