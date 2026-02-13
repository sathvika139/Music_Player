// frontend/src/components/layout/Footer.jsx
import { useEffect, useRef } from "react";
import { usePlayer } from "../../context/PlayerContext";
import { ACTIONS } from "../../context/PlayerContext";

import SongDetail from "../player/SongDetail";
import ControlArea from "../player/ControlArea";
import Features from "../player/Features";

import "../../css/footer/Footer.css";

const Footer = () => {
  const { state, dispatch } = usePlayer();
  const audioRef = useRef(null);

  // 🎧 Handle song source change
  useEffect(() => {
    if (!audioRef.current || !state.currentSong) return;

    audioRef.current.src = state.currentSong.audio;
    audioRef.current.load();

    if (state.isPlaying) {
      audioRef.current.play().catch(() => {
        dispatch({ type: ACTIONS.PAUSE });
      });
    }
  }, [state.currentSong, state.isPlaying, dispatch]);

  // ▶️ Play / Pause
  useEffect(() => {
    if (!audioRef.current) return;

    if (state.isPlaying) {
      audioRef.current.play().catch(() => {
        dispatch({ type: ACTIONS.PAUSE });
      });
    } else {
      audioRef.current.pause();
    }
  }, [state.isPlaying, dispatch]);

  // 🔊 Volume & Mute
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = state.isMuted ? 0 : state.volume;
  }, [state.volume, state.isMuted]);

  // ⏱ Audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () =>
      dispatch({
        type: ACTIONS.SET_CURRENT_TIME,
        payload: audio.currentTime,
      });

    const onLoadedMetadata = () =>
      dispatch({
        type: ACTIONS.SET_DURATION,
        payload: audio.duration,
      });

    const onEnded = () => {
      if (state.repeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        dispatch({ type: ACTIONS.NEXT_SONG });
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [dispatch, state.repeat]);

  return (
    <footer className="footer-root footer-glow">
      <audio ref={audioRef} />

      <SongDetail currentSong={state.currentSong} />
      <ControlArea />
      <Features />
    </footer>
  );
};

export default Footer;
