import React, { useState, useEffect } from "react";
import { usePlayer } from "../../context/PlayerContext";
import { useAudio } from "../../hooks/useAudio";
import Sidebar from "../common/Sidebar";
import Player from "../player/Player";
import SongList from "../player/SongList";
import "./Favourites.css";

function Favourites() {
  const { state } = usePlayer();
  const { playSong } = useAudio();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/favourites", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch favourites");
      }

      const data = await response.json();
      setFavourites(data.favourites || []);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSongClick = (song, index) => {
    playSong(song, index);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="home-container">
      <Sidebar onLogout={handleLogout} />

      <main className="main-content">
        <header className="favourites-header">
          <div className="header-content">
            <i className="fas fa-heart header-icon"></i>
            <div>
              <h1>My Favourite</h1>
              <p>
                {favourites.length} {favourites.length === 1 ? "song" : "songs"}
              </p>
            </div>
          </div>
        </header>

        <div className="favourites-content">
          {loading ? (
            <div className="loading-favourites">
              <div className="spinner"></div>
              <p>Loading your favourites...</p>
            </div>
          ) : favourites.length === 0 ? (
            <div className="no-favourites">
              <i className="fas fa-heart-broken"></i>
              <h3>No favourites yet</h3>
              <p>Start adding songs to your favourites!</p>
            </div>
          ) : (
            <SongList
              songs={favourites}
              currentSong={state.currentSong}
              onSongClick={handleSongClick}
              isPlaying={state.isPlaying}
            />
          )}
        </div>
      </main>

      <Player />
    </div>
  );
}

export default Favourites;
