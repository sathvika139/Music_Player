import { useEffect, useCallback } from "react";
import { usePlayer } from "../context/PlayerContext";
import { ACTIONS } from "../context/PlayerContext";

export function useSongs() {
  const { state, dispatch } = usePlayer();

  // Fetch all songs
  const fetchSongs = useCallback(async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });

    try {
      const response = await fetch("http://localhost:5000/api/songs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch songs");
      }

      const data = await response.json();

      // Transform the data to match your schema
      const transformedSongs = data.results.map((song) => ({
        id: song.id,
        name: song.name,
        artist: song.artist_name,
        artist_id: song.artist_id,
        artistLastfm: song.artist_lastfm,
        album: song.album_name,
        album_id: song.album_id,
        duration: song.duration,
        releasedate: song.releasedate,
        audio: song.audio,
        audioDownload: song.audiodownload,
        image: song.image,
        proarti: song.proarti,
        shareurl: song.shareurl,
        audioDownloadAllowed: song.audiodownload_allowed,
        contentIdFree: song.content_id_free,
      }));

      dispatch({
        type: ACTIONS.SET_SONGS,
        payload: transformedSongs,
      });

      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    } catch (error) {
      console.error("Error fetching songs:", error);
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: error.message,
      });
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, [dispatch]);

  // Fetch songs by playlist
  const fetchSongsByPlaylist = useCallback(
    async (playlistId) => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });

      try {
        const response = await fetch(
          `http://localhost:5000/api/playlists/${playlistId}/songs`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch playlist songs");
        }

        const data = await response.json();

        const transformedSongs = data.songs.map((song) => ({
          id: song.id,
          name: song.name,
          artist: song.artist_name,
          artist_id: song.artist_id,
          artistLastfm: song.artist_lastfm,
          album: song.album_name,
          album_id: song.album_id,
          duration: song.duration,
          releasedate: song.releasedate,
          audio: song.audio,
          audioDownload: song.audiodownload,
          image: song.image,
          proarti: song.proarti,
          shareurl: song.shareurl,
          audioDownloadAllowed: song.audiodownload_allowed,
          contentIdFree: song.content_id_free,
        }));

        dispatch({
          type: ACTIONS.SET_SONGS,
          payload: transformedSongs,
        });

        dispatch({
          type: ACTIONS.SET_PLAYLIST,
          payload: playlistId,
        });

        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      } catch (error) {
        console.error("Error fetching playlist songs:", error);
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: error.message,
        });
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }
    },
    [dispatch],
  );

  // Search songs
  const searchSongs = useCallback(
    async (query) => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });

      try {
        const response = await fetch(
          `http://localhost:5000/api/songs/search?q=${encodeURIComponent(query)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to search songs");
        }

        const data = await response.json();

        const transformedSongs = data.results.map((song) => ({
          id: song.id,
          name: song.name,
          artist: song.artist_name,
          artist_id: song.artist_id,
          artistLastfm: song.artist_lastfm,
          album: song.album_name,
          album_id: song.album_id,
          duration: song.duration,
          releasedate: song.releasedate,
          audio: song.audio,
          audioDownload: song.audiodownload,
          image: song.image,
          proarti: song.proarti,
          shareurl: song.shareurl,
          audioDownloadAllowed: song.audiodownload_allowed,
          contentIdFree: song.content_id_free,
        }));

        dispatch({
          type: ACTIONS.SET_SONGS,
          payload: transformedSongs,
        });

        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      } catch (error) {
        console.error("Error searching songs:", error);
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: error.message,
        });
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }
    },
    [dispatch],
  );

  // Fetch songs on mount
  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  return {
    songs: state.songs,
    loading: state.loading,
    error: state.error,
    fetchSongs,
    fetchSongsByPlaylist,
    searchSongs,
  };
}
