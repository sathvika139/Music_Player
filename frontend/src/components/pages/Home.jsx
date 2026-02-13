import React, { useState } from "react";
import { usePlayer } from "../../context/PlayerContext";
import { useAudio } from "../../hooks/useAudio";
import { useSongs } from "../../hooks/useSongs";
import Sidebar from "../common/Sidebar";
import Player from "../player/Player";
import SongList from "../player/SongList";
import PlaylistGrid from "../player/PlaylistGrid";
import "./Home.css";

function Home() {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  const { state } = usePlayer();
  const { playSong } = useAudio();
  const { songs, loading, error } = useSongs();
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
        <Sidebar
          onLogout={handleLogout}
          onProfileClick={() => setShowProfile(true)}
        />
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
        <Sidebar
          onLogout={handleLogout}
          onProfileClick={() => setShowProfile(true)}
        />
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
      <Sidebar />

      <div className="main-wrapper">
        <main className="main-content">
          <header className="main-header">
            <h1>Playlists</h1>
            <div className="auth-actions">
              {isAuthenticated ? (
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <>
                  <button
                    className="login-btn"
                    onClick={() => (window.location.href = "/login")}
                  >
                    Login
                  </button>
                  <button
                    className="signup-btn"
                    onClick={() => (window.location.href = "/signup")}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
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

// Profile Modal Component
function ProfileModal({ onClose }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : { name: "", email: "" };
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/users/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
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
                  required
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
                  required
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
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-item">
                <label>Name</label>
                <p>{user.name}</p>
              </div>

              <div className="info-item">
                <label>Email</label>
                <p>{user.email}</p>
              </div>

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
