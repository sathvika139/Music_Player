import React from "react";
import "./PlaylistGrid.css";

const PlaylistGrid = ({
  playlists = [], // ✅ default value
  onPlaylistClick = () => {},
  selectedPlaylist = null,
}) => {
  if (!playlists.length) {
    return <p className="empty-text">No playlists available</p>;
  }

  return (
    <div className="playlist-grid">
      {playlists.map((playlist) => (
        <div
          key={playlist.id}
          className={`playlist-card ${
            selectedPlaylist?.id === playlist.id ? "active" : ""
          }`}
          onClick={() => onPlaylistClick(playlist)}
          style={{ "--playlist-color": playlist.color }}
        >
          <div className="playlist-image-wrapper">
            <img
              src={playlist.image}
              alt={playlist.name}
              className="playlist-image"
              onError={(e) => (e.target.src = "/fallback.png")}
            />
            <div className="playlist-overlay"></div>
          </div>
          <h3 className="playlist-name">{playlist.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default PlaylistGrid;
