import { db } from "../config/db.js";

export const toggleFavorite = async (req, res) => {
  try {
    const { songId } = req.body;
    const userId = req.user.id; // From your auth middleware

    // 1. Check if it's already a favorite
    const [existing] = await db.query(
      "SELECT * FROM favorites WHERE user_id = ? AND song_id = ?",
      [userId, songId],
    );

    if (existing.length > 0) {
      // If it exists, remove it (Unfavorite)
      await db.query(
        "DELETE FROM favorites WHERE user_id = ? AND song_id = ?",
        [userId, songId],
      );
      return res.json({ success: true, isFavorite: false });
    } else {
      // If it doesn't exist, add it (Favorite)
      await db.query("INSERT INTO favorites (user_id, song_id) VALUES (?, ?)", [
        userId,
        songId,
      ]);
      return res.json({ success: true, isFavorite: true });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
