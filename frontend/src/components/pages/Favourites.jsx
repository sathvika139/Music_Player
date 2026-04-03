import React, { useState } from "react";
import { usePlayer } from "../../context/PlayerContext";
import { useAudio } from "../../hooks/useAudio";
import Sidebar from "../common/Sidebar";
import Player from "../player/Player";
import SongList from "../player/SongList";
import "./Favourites.css";

function Favourites() {
  const { state } = usePlayer();
  const { playSong } = useAudio();

  const [favourites] = useState([]);

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

      <div className="main-wrapper">
        <main className="main-content">
          <header className="favourites-header">
            <div className="header-content">
              <i className="fas fa-heart header-icon"></i>
              <div>
                <h1>My Favourite</h1>
                <p>
                  {favourites.length}{" "}
                  {favourites.length === 1 ? "song" : "songs"}
                </p>
              </div>
            </div>
          </header>

          <div className="favourites-content">
            {favourites.length === 0 ? (
              <div className="no-favourites">
                <i className="fas fa-heart-broken"></i>
                <h3>No favourites yet</h3>
                <p>Add songs to favourites to see them here.</p>
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
    </div>
  );
}

export default Favourites;
