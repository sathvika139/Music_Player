import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { db } from "../config/connectDB.js";
import dotenv from "dotenv";

dotenv.config();

/* ================= JWT ================= */
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  });
};

/* ================= SIGNUP ================= */
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const { rows: exist } = await db.query(
      "SELECT id FROM users WHERE email = $1",
      [email],
    );

    if (exist.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
      [name, email, hashed],
    );

    const userId = result.rows[0].id;

    const token = createToken(userId);

    res.status(201).json({
      message: "User created",
      token,
      user: {
        id: userId,
        name,
        email,
      },
    });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ message: "Signup error" });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    console.log("LOGIN BODY:", req.body);
    console.log("DB RESULT:", rows);

    if (rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = rows[0];

    if (!user || !user.password) {
      // ✅ ADDED SAFETY
      return res.status(400).json({ message: "Invalid user data" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = createToken(user.id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET ME ================= */
export const getMe = async (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user,
  });
};

/* ================= FORGOT PASSWORD ================= */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const { rows: users } = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "No user found" });
    }

    const user = users[0];

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const expires = new Date(Date.now() + 10 * 60 * 1000);

    await db.query(
      "UPDATE users SET reset_password_token=$1, reset_password_expires=$2 WHERE id=$3",
      [hashedToken, expires, user.id],
    );

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    res.json({
      message: "Reset link generated",
      resetUrl,
    });
  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);
    res.status(500).json({ message: "Forgot password error" });
  }
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const { rows: users } = await db.query(
      "SELECT * FROM users WHERE reset_password_token=$1 AND reset_password_expires > NOW()",
      [hashedToken],
    );

    if (users.length === 0) {
      return res.status(400).json({ message: "Token invalid or expired" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "UPDATE users SET password=$1, reset_password_token=NULL, reset_password_expires=NULL WHERE id=$2",
      [hashedPassword, users[0].id],
    );

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
    res.status(500).json({ message: "Reset password error" });
  }
};

/* ================= EDIT PROFILE ================= */
export const editProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const userId = req.user.id;

    await db.query("UPDATE users SET name=$1, avatar=$2 WHERE id=$3", [
      name,
      avatar,
      userId,
    ]);

    res.json({ message: "Profile updated" });
  } catch (err) {
    console.error("EDIT PROFILE ERROR:", err);
    res.status(500).json({ message: "Profile update failed" });
  }
};
