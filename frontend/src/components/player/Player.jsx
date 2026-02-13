import React, { useRef } from "react";
import { usePlayer } from "../../context/PlayerContext";
import { useAudio } from "../../hooks/useAudio";
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
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const time = percent * state.duration;
    seekTo(time);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const progressPercent = (state.currentTime / state.duration) * 100 || 0;

  return (
    <div className="player">
      {/* Song Info */}
      <div className="player-song-info">
        {state.currentSong ? (
          <>
            <div className="song-thumbnail">
              <img
                src={state.currentSong.image || "/default-album.png"}
                alt={state.currentSong.name}
                onError={(e) => {
                  e.target.src = "/default-album.png";
                }}
              />
            </div>
            <div className="song-details">
              <h4>{state.currentSong.name}</h4>
              <p>{state.currentSong.artist}</p>
            </div>
          </>
        ) : (
          <div className="no-song">
            <div className="no-song-placeholder"></div>
            <p className="no-song-text">Not selected</p>
          </div>
        )}
      </div>

      {/* Player Controls */}
      <div className="player-controls">
        <div className="control-buttons">
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
            title={state.isPlaying ? "Pause" : "Play"}
          >
            <i
              className={`fas ${state.isPlaying ? "fa-pause" : "fa-play"}`}
            ></i>
          </button>

          <button className="btn-control" onClick={nextSong} title="Next">
            <i className="fas fa-step-forward"></i>
          </button>

          <button
            className={`btn-favorite ${state.currentSong ? "" : "disabled"}`}
            title="Add to favorites"
          >
            <i className="far fa-heart"></i>
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

      {/* Volume Controls */}
      <div className="player-volume">
        <button
          className="btn-volume"
          onClick={toggleMute}
          title={state.isMuted ? "Unmute" : "Mute"}
        >
          <i
            className={`fas ${state.isMuted || state.volume === 0 ? "fa-volume-mute" : state.volume < 0.5 ? "fa-volume-down" : "fa-volume-up"}`}
          ></i>
        </button>

        <button
          className={`btn-control ${state.shuffle ? "active" : ""}`}
          onClick={toggleShuffle}
          title="Shuffle"
        >
          <i className="fas fa-random"></i>
        </button>

        <button
          className={`btn-control ${state.repeat ? "active" : ""}`}
          onClick={toggleRepeat}
          title="Repeat"
        >
          <i className="fas fa-redo"></i>
        </button>

        <button className="btn-control" title="Queue">
          <i className="fas fa-list"></i>
        </button>
      </div>
    </div>
  );
}

export default Player;
