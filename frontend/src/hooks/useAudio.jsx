import { useRef, useEffect, useCallback } from "react";
import { usePlayer } from "../context/PlayerContext";
import { ACTIONS } from "../context/PlayerContext";

export function useAudio() {
  const { state, dispatch } = usePlayer();
  const audioRef = useRef(new Audio());

  // Update audio source when current song changes
  useEffect(() => {
    if (state.currentSong && state.currentSong.audio) {
      audioRef.current.src = state.currentSong.audio;
      audioRef.current.load();

      if (state.isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          dispatch({ type: ACTIONS.PAUSE });
        });
      }
    }
  }, [state.currentSong, dispatch]);

  // Handle play/pause
  useEffect(() => {
    if (state.isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
        dispatch({ type: ACTIONS.PAUSE });
      });
    } else {
      audioRef.current.pause();
    }
  }, [state.isPlaying, dispatch]);

  // Handle volume changes
  useEffect(() => {
    audioRef.current.volume = state.isMuted ? 0 : state.volume;
  }, [state.volume, state.isMuted]);

  // Set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      dispatch({
        type: ACTIONS.SET_CURRENT_TIME,
        payload: audio.currentTime,
      });
    };

    const handleLoadedMetadata = () => {
      dispatch({
        type: ACTIONS.SET_DURATION,
        payload: audio.duration,
      });
    };

    const handleEnded = () => {
      if (state.repeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        dispatch({ type: ACTIONS.NEXT_SONG });
      }
    };

    const handleError = (e) => {
      console.error("Audio error:", e);
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: "Error loading audio",
      });
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [dispatch, state.repeat]);

  // Play function
  const play = useCallback(() => {
    dispatch({ type: ACTIONS.PLAY });
  }, [dispatch]);

  // Pause function
  const pause = useCallback(() => {
    dispatch({ type: ACTIONS.PAUSE });
  }, [dispatch]);

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  // Next song
  const nextSong = useCallback(() => {
    dispatch({ type: ACTIONS.NEXT_SONG });
  }, [dispatch]);

  // Previous song
  const previousSong = useCallback(() => {
    if (state.currentTime > 3) {
      // If more than 3 seconds, restart current song
      audioRef.current.currentTime = 0;
    } else {
      dispatch({ type: ACTIONS.PREVIOUS_SONG });
    }
  }, [dispatch, state.currentTime]);

  // Seek to time
  const seekTo = useCallback(
    (time) => {
      audioRef.current.currentTime = time;
      dispatch({
        type: ACTIONS.SET_CURRENT_TIME,
        payload: time,
      });
    },
    [dispatch],
  );

  // Set volume
  const setVolume = useCallback(
    (volume) => {
      dispatch({
        type: ACTIONS.SET_VOLUME,
        payload: volume,
      });
    },
    [dispatch],
  );

  // Toggle mute
  const toggleMute = useCallback(() => {
    dispatch({ type: ACTIONS.TOGGLE_MUTE });
  }, [dispatch]);

  // Toggle repeat
  const toggleRepeat = useCallback(() => {
    dispatch({ type: ACTIONS.TOGGLE_REPEAT });
  }, [dispatch]);

  // Toggle shuffle
  const toggleShuffle = useCallback(() => {
    dispatch({ type: ACTIONS.TOGGLE_SHUFFLE });
  }, [dispatch]);

  // Play specific song
  const playSong = useCallback(
    (song, index) => {
      dispatch({
        type: ACTIONS.SET_CURRENT_SONG,
        payload: { song, index },
      });
    },
    [dispatch],
  );

  return {
    audioRef,
    play,
    pause,
    togglePlayPause,
    nextSong,
    previousSong,
    seekTo,
    setVolume,
    toggleMute,
    toggleRepeat,
    toggleShuffle,
    playSong,
  };
}
export default useAudio;
