import React from "react";
import "./SongList.css";

function SongList({ songs, currentSong, onSongClick, isPlaying }) {
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="song-list">
      <div className="song-list-header">
        <div className="header-no">NO</div>
        <div className="header-name">NAME</div>
        <div className="header-artist">ARTIST</div>
        <div className="header-year">YEAR</div>
        <div className="header-duration">DURATION</div>
      </div>

      <div className="song-list-body">
        {songs.length === 0 ? (
          <div className="no-songs">
            <p>No songs found</p>
          </div>
        ) : (
          songs.map((song, index) => {
            const isCurrentSong = currentSong && currentSong.id === song.id;

            return (
              <div
                key={song.id}
                className={`song-item ${isCurrentSong ? "active" : ""}`}
                onClick={() => onSongClick(song, index)}
              >
                <div className="song-no">
                  {isCurrentSong && isPlaying ? (
                    <i className="fas fa-volume-up playing-icon"></i>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                <div className="song-name">
                  <div className="song-name">
                    <span>{song.name}</span>
                  </div>
                </div>

                <div className="song-artist">{song.artist}</div>

                <div className="song-year">
                  {song.releasedate
                    ? new Date(song.releasedate).getFullYear()
                    : "-"}
                </div>

                <div className="song-duration">
                  {formatDuration(song.duration)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default SongList;
