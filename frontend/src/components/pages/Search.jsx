import React, { useState } from "react";
import { usePlayer } from "../../context/PlayerContext";
import { useAudio } from "../../hooks/UseAudio";
import { UseSongs } from "../../hooks/UseSongs";
import Sidebar from "../common/Sidebar";
import Player from "../player/Player";
import SongList from "../player/SongList";
import "./Search.css";

function Search() {
  const { state } = usePlayer();
  const { playSong } = UseAudio();
  const { searchSongs, songs, loading } = UseSongs();
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setHasSearched(true);
      await searchSongs(searchQuery);
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
        <header className="search-header">
          <h1>Search</h1>
        </header>

        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                className="search-input"
                placeholder="Search for songs, artists, albums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-btn"
                  onClick={() => {
                    setSearchQuery("");
                    setHasSearched(false);
                  }}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>

          <div className="search-results">
            {loading && hasSearched && (
              <div className="loading-search">
                <div className="spinner"></div>
                <p>Searching...</p>
              </div>
            )}

            {!loading && hasSearched && songs.length === 0 && (
              <div className="no-results">
                <i className="fas fa-music"></i>
                <h3>No results found</h3>
                <p>Try searching with different keywords</p>
              </div>
            )}

            {!loading && hasSearched && songs.length > 0 && (
              <div className="results-section">
                <h2>Results for "{searchQuery}"</h2>
                <SongList
                  songs={songs}
                  currentSong={state.currentSong}
                  onSongClick={handleSongClick}
                  isPlaying={state.isPlaying}
                />
              </div>
            )}

            {!hasSearched && (
              <div className="search-placeholder">
                <i className="fas fa-search"></i>
                <h3>Start searching</h3>
                <p>Find your favorite songs, artists, and albums</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Player />
    </div>
  );
}

export default Search;
