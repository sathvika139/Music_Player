import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [users] = await db.query(
      "SELECT id,name,email FROM users WHERE id=?",
      [decoded.id],
    );

    if (users.length === 0)
      return res.status(401).json({ message: "User not found" });

    req.user = users[0];
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
