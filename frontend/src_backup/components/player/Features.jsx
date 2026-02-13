import React from "react";
import { IoVolumeHighOutline } from "react-icons/io5";
import { TbArrowsShuffle } from "react-icons/tb";
import { RiLoopRightLine } from "react-icons/ri";

import "../../css/footer/Feature.css";

const Features = ({ audioPlayer }) => {
  if (!audioPlayer) return null; // 🛑 PREVENT CRASH

  const {
    handleChangeVolume,
    isMuted = false,
    shuffleEnabled = false,
    loopEnabled = false,
  } = audioPlayer;

  return (
    <div className="features-root">
      <div className="features-row">
        <button className="features-btn">
          <IoVolumeHighOutline
            color={isMuted ? "#9ca3af" : "#a855f7"}
            size={26}
          />
        </button>

        <button className="features-btn">
          <TbArrowsShuffle
            color={shuffleEnabled ? "#a855f7" : "#9ca3af"}
            size={26}
          />
        </button>

        <button className="features-btn">
          <RiLoopRightLine
            color={loopEnabled ? "#a855f7" : "#9ca3af"}
            size={26}
          />
        </button>
      </div>

      <div className="features-volume-wrapper">
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          defaultValue={1}
          onChange={(e) =>
            handleChangeVolume && handleChangeVolume(Number(e.target.value))
          }
          className="features-volume-range"
        />
      </div>
    </div>
  );
};

export default Features;
