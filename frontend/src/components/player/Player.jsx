import React, { useRef } from "react";
import { usePlayer } from "../../context/PlayerContext";
import { useAudio } from "useAudio../../hooks/useAudio";
import "./Player.css";

function Player() {
  const { state } = usePlayer();
  const {
    togglePlayPause,
    nextSong,
    previousSong,
    seekTo,
    setVolume,
    toggleMute,
    toggleRepeat,
    toggleShuffle,
  } = useAudio();

  const progressRef = useRef(null);

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === null) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e) => {
    if (!progressRef.current || !state.duration) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = Math.min(
      Math.max(0, (e.clientX - rect.left) / rect.width),
      1,
    );
    seekTo(percent * state.duration);
  };

  const progressPercent = (state.currentTime / state.duration) * 100 || 0;

  return (
    <div className="player">
      {/* LEFT: Song Info */}
      <div className="player-song-info">
        {state.currentSong ? (
          <>
            <div className="song-thumbnail">
              {state.currentSong.image ? (
                <img
                  src={state.currentSong.image}
                  alt={state.currentSong.name}
                />
              ) : (
                <div className="no-song-placeholder">
                  <i
                    className="fas fa-music"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  ></i>
                </div>
              )}
            </div>
            <div className="song-details">
              <h4>{state.currentSong.name}</h4>
              <p>{state.currentSong.artist || "Unknown Artist"}</p>
            </div>
          </>
        ) : (
          <div className="no-song">
            <div className="no-song-placeholder"></div>
            <p className="no-song-text">No track selected</p>
          </div>
        )}
      </div>

      {/* CENTER: Controls */}
      <div className="player-controls">
        <div className="control-buttons">
          <button
            className={`btn-control ${state.shuffle ? "active" : ""}`}
            onClick={toggleShuffle}
            title="Shuffle"
          >
            <i
              className={`fas ${state.isPlaying ? "fa-pause" : "fa-play"}`}
              style={!state.isPlaying ? { paddingLeft: "3px" } : {}}
            ></i>
          </button>
          <button
            className="btn-control"
            onClick={previousSong}
            title="Previous"
          >
            <i className="fas fa-step-backward"></i>
          </button>
          <button
            className="btn-play"
            onClick={togglePlayPause}
            title="Play/Pause"
          >
            <i
              className={`fas ${state.isPlaying ? "fa-pause" : "fa-play"}`}
            ></i>
          </button>
          <button className="btn-control" onClick={nextSong} title="Next">
            <i className="fas fa-step-forward"></i>
          </button>
          <button
            className={`btn-control ${state.repeat ? "active" : ""}`}
            onClick={toggleRepeat}
            title="Repeat"
          >
            <i className="fas fa-redo"></i>
          </button>
          <button
            className="fav-btn"
            onClick={() => handleToggleFavorite(currentSong.id)}
          >
            <i className="far fa-heart"></i>{" "}
          </button>
        </div>

        <div className="progress-container">
          <span className="time-current">{formatTime(state.currentTime)}</span>
          <div
            className="progress-bar"
            ref={progressRef}
            onClick={handleProgressClick}
          >
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span className="time-duration">{formatTime(state.duration)}</span>
        </div>
      </div>

      {/* RIGHT: Volume */}
      <div className="player-volume">
        <button className="btn-control" title="Queue">
          <i className="fas fa-list"></i>
        </button>
        <button className="btn-volume" onClick={toggleMute}>
          <i
            className={`fas ${state.isMuted || state.volume === 0 ? "fa-volume-mute" : "fa-volume-up"}`}
          ></i>
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={state.volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          style={{ width: "80px", accentColor: "#a855f7" }}
        />
      </div>
    </div>
  );
}

export default Player;
