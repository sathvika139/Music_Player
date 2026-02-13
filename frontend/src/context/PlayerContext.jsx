import React, { createContext, useReducer, useContext } from "react";

/* =========================
   INITIAL STATE
========================= */
const initialState = {
  songs: [],
  playlists: [], // ✅ ADDED (IMPORTANT)
  currentSong: null,
  currentIndex: 0,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  repeat: false,
  shuffle: false,
  currentPlaylist: null, // ✅ clearer naming
  loading: true,
  error: null,
};

/* =========================
   ACTION TYPES
========================= */
export const ACTIONS = {
  SET_SONGS: "SET_SONGS",
  SET_PLAYLISTS: "SET_PLAYLISTS", // ✅ ADDED
  SET_CURRENT_SONG: "SET_CURRENT_SONG",
  PLAY: "PLAY",
  PAUSE: "PAUSE",
  NEXT_SONG: "NEXT_SONG",
  PREVIOUS_SONG: "PREVIOUS_SONG",
  SET_CURRENT_TIME: "SET_CURRENT_TIME",
  SET_DURATION: "SET_DURATION",
  SET_VOLUME: "SET_VOLUME",
  TOGGLE_MUTE: "TOGGLE_MUTE",
  TOGGLE_REPEAT: "TOGGLE_REPEAT",
  TOGGLE_SHUFFLE: "TOGGLE_SHUFFLE",
  SET_PLAYLIST: "SET_PLAYLIST",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  PLAY_SONG_AT_INDEX: "PLAY_SONG_AT_INDEX",
};

/* =========================
   REDUCER
========================= */
function playerReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_SONGS:
      return {
        ...state,
        songs: action.payload,
        currentSong: action.payload.length ? action.payload[0] : null,
        currentIndex: 0,
        loading: false,
      };

    case ACTIONS.SET_PLAYLISTS: // ✅ ADDED
      return {
        ...state,
        playlists: action.payload || [],
      };

    case ACTIONS.SET_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.payload.song,
        currentIndex: action.payload.index,
        isPlaying: true,
      };

    case ACTIONS.PLAY:
      return { ...state, isPlaying: true };

    case ACTIONS.PAUSE:
      return { ...state, isPlaying: false };

    case ACTIONS.NEXT_SONG: {
      if (!state.songs.length) return state;

      const nextIndex = state.shuffle
        ? Math.floor(Math.random() * state.songs.length)
        : (state.currentIndex + 1) % state.songs.length;

      return {
        ...state,
        currentSong: state.songs[nextIndex],
        currentIndex: nextIndex,
        isPlaying: true,
        currentTime: 0,
      };
    }

    case ACTIONS.PREVIOUS_SONG: {
      if (!state.songs.length) return state;

      const prevIndex =
        state.currentIndex === 0
          ? state.songs.length - 1
          : state.currentIndex - 1;

      return {
        ...state,
        currentSong: state.songs[prevIndex],
        currentIndex: prevIndex,
        isPlaying: true,
        currentTime: 0,
      };
    }

    case ACTIONS.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };

    case ACTIONS.SET_DURATION:
      return { ...state, duration: action.payload };

    case ACTIONS.SET_VOLUME:
      return {
        ...state,
        volume: action.payload,
        isMuted: action.payload === 0,
      };

    case ACTIONS.TOGGLE_MUTE:
      return { ...state, isMuted: !state.isMuted };

    case ACTIONS.TOGGLE_REPEAT:
      return { ...state, repeat: !state.repeat };

    case ACTIONS.TOGGLE_SHUFFLE:
      return { ...state, shuffle: !state.shuffle };

    case ACTIONS.SET_PLAYLIST:
      return {
        ...state,
        currentPlaylist: action.payload,
      };

    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case ACTIONS.PLAY_SONG_AT_INDEX:
      return {
        ...state,
        currentSong: state.songs[action.payload],
        currentIndex: action.payload,
        isPlaying: true,
        currentTime: 0,
      };

    default:
      return state;
  }
}

/* =========================
   CONTEXT
========================= */
const PlayerContext = createContext(null);

/* =========================
   PROVIDER
========================= */
export function PlayerProvider({ children }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
}

/* =========================
   CUSTOM HOOK
========================= */
export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within PlayerProvider");
  }
  return context;
}
