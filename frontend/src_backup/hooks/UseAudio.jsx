// frontend/src/hooks/useAudio.jsx
import { useCallback } from "react";
import { usePlayer } from "../context/PlayerContext";
import { ACTIONS } from "../context/PlayerContext";

export function useAudio() {
  const { state, dispatch } = usePlayer();

  // 🔥 ONLY STATE INTENT — NO AUDIO HARDWARE

  const play = useCallback(() => {
    dispatch({ type: ACTIONS.PLAY });
  }, [dispatch]);

  const pause = useCallback(() => {
    dispatch({ type: ACTIONS.PAUSE });
  }, [dispatch]);

  const togglePlayPause = useCallback(() => {
    dispatch({
      type: state.isPlaying ? ACTIONS.PAUSE : ACTIONS.PLAY,
    });
  }, [dispatch, state.isPlaying]);

  const nextSong = useCallback(() => {
    dispatch({ type: ACTIONS.NEXT_SONG });
  }, [dispatch]);

  const previousSong = useCallback(() => {
    dispatch({ type: ACTIONS.PREVIOUS_SONG });
  }, [dispatch]);

  const seekTo = useCallback(
    (time) => {
      dispatch({
        type: ACTIONS.SET_CURRENT_TIME,
        payload: time,
      });
    },
    [dispatch],
  );

  const setVolume = useCallback(
    (volume) => {
      dispatch({
        type: ACTIONS.SET_VOLUME,
        payload: volume,
      });
    },
    [dispatch],
  );

  const toggleMute = useCallback(() => {
    dispatch({ type: ACTIONS.TOGGLE_MUTE });
  }, [dispatch]);

  const toggleRepeat = useCallback(() => {
    dispatch({ type: ACTIONS.TOGGLE_REPEAT });
  }, [dispatch]);

  const toggleShuffle = useCallback(() => {
    dispatch({ type: ACTIONS.TOGGLE_SHUFFLE });
  }, [dispatch]);

  const playSong = useCallback(
    (song) => {
      dispatch({
        type: ACTIONS.SET_CURRENT_SONG,
        payload: song,
      });
    },
    [dispatch],
  );

  return {
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
