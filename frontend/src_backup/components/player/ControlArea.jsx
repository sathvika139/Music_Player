import React from "react";
import { GiPauseButton } from "react-icons/gi";
import { FaCirclePlay } from "react-icons/fa6";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";

import "../../css/footer/ControlArea.css";

const ControlArea = ({ audioPlayer }) => {
  if (!audioPlayer) return null;

  const {
    isPlaying,
    currentTime,
    duration,
    handleTogglePlay,
    playSongAtIndex,
    next,
    prev,
    handleSeek,
  } = audioPlayer;

  return (
    <div className="control-root">
      {/* Buttons */}
      <div className="control-buttons">
        <button onClick={prev} className="control-icon-btn">
          <TbPlayerTrackPrevFilled size={24} />
        </button>

        <button onClick={handleTogglePlay} className="control-play-btn">
          {isPlaying ? <GiPauseButton size={42} /> : <FaCirclePlay size={42} />}
        </button>

        <button onClick={next} className="control-icon-btn">
          <TbPlayerTrackNextFilled size={24} />
        </button>
      </div>

      {/* Progress */}
      <div className="control-progress-wrapper">
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={(e) => handleSeek(Number(e.target.value))}
          className="control-progress"
        />

        <div className="control-times">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

function formatTime(sec = 0) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default ControlArea;
