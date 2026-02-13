import { db } from "../config/db.js";

// Get all songs
export const getAllSongs = async (req, res) => {
  try {
    const [songs] = await db.query(`
      SELECT 
        id,
        name,
        artist_name,
        artist_id,
        artist_lastfm,
        album_name,
        album_id,
        duration,
        releasedate,
        audio,
        audiodownload,
        image,
        proarti,
        shareurl,
        audiodownload_allowed,
        content_id_free
      FROM songs
      ORDER BY releasedate DESC
    `);

    res.json({
      success: true,
      results: songs,
      count: songs.length,
    });
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch songs",
      error: error.message,
    });
  }
};

// Search songs
export const searchSongs = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const [songs] = await db.query(
      `
      SELECT * FROM songs 
      WHERE name LIKE ? OR artist_name LIKE ? OR album_name LIKE ?
      ORDER BY releasedate DESC
    `,
      [`%${q}%`, `%${q}%`, `%${q}%`],
    );

    res.json({
      success: true,
      results: songs,
      count: songs.length,
    });
  } catch (error) {
    console.error("Error searching songs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to search songs",
      error: error.message,
    });
  }
};

// Get song by ID
export const getSongById = async (req, res) => {
  try {
    const { id } = req.params;

    const [songs] = await db.query("SELECT * FROM songs WHERE id = ?", [id]);

    if (songs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    res.json({
      success: true,
      song: songs[0],
    });
  } catch (error) {
    console.error("Error fetching song:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch song",
      error: error.message,
    });
  }
};
