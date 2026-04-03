import React, { useState } from "react";
import { usePlayer } from "../../context/PlayerContext";
import { useAudio } from "../../hooks/UseAudio";
import { UseSongs } from "../../hooks/UseSongs";

import Sidebar from "../common/Sidebar";
import Player from "../player/Player";
import SongList from "../player/SongList";
import PlaylistGrid from "../player/PlaylistGrid";

import "./Home.css";

function Home() {
  const { state } = usePlayer();
  const { playSong } = UseAudio();
  const { songs, loading, error } = UseSongs();

  const [showProfile, setShowProfile] = useState(false);

  const handleSongClick = (song, index) => {
    playSong(song, index);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (loading && songs.length === 0) {
    return (
      <div className="home-container">
        <Sidebar onLogout={handleLogout} />
        <div className="main-wrapper">
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading your music...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <Sidebar onLogout={handleLogout} />
        <div className="main-wrapper">
          <div className="error">
            <p>Error: {error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <Sidebar
        onLogout={handleLogout}
        onProfileClick={() => setShowProfile(true)}
      />

      <div className="main-wrapper">
        <main className="main-content">
          <header className="main-header">
            <h1>Playlists</h1>
          </header>

          <section className="playlists-section">
            <PlaylistGrid
              playlists={state.playlists}
              selectedPlaylist={state.currentPlaylist}
            />
          </section>

          <section className="songs-section">
            <SongList
              songs={songs}
              currentSong={state.currentSong}
              onSongClick={handleSongClick}
              isPlaying={state.isPlaying}
            />
          </section>
        </main>

        <Player />
      </div>

      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
    </div>
  );
}

/* ---------------- PROFILE MODAL ---------------- */

function ProfileModal({ onClose }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : { name: "", email: "" };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("user", JSON.stringify(formData));
    setUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Profile Settings</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>

                <button type="submit" className="btn-save">
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <button onClick={() => setIsEditing(true)} className="btn-edit">
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
