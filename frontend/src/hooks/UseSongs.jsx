import { useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";
import { ACTIONS } from "../context/PlayerContext";

export function useSongs() {
  const { state, dispatch } = usePlayer();

  // Cloudinary songs list
  const songs = [
    {
      id: 1,
      name: "Kapolla Intikada Part 4",
      artist: "Unknown Artist",
      album: "Single",
      duration: 240,
      image: "/default-album.jpg",
      audio:
        "https://res.cloudinary.com/dkvzokno0/video/upload/v1772787743/Kapolla_Intikada_Part-4_m0xdtq.mp3",
    },

    {
      id: 2,
      name: "Kapolla Intikada Part 2",
      artist: "Unknown Artist",
      album: "Single",
      duration: 200,
      image: "/default-album.jpg",
      audio:
        "https://res.cloudinary.com/dkvzokno0/video/upload/v1773376622/Kapolla_Intikada_Part-2_amfs7q.mp3",
    },

    {
      id: 3,
      name: "Kapolla Intikada Part 3",
      artist: "Unknown Artist",
      album: "Single",
      duration: 220,
      image: "/default-album.jpg",
      audio:
        "https://res.cloudinary.com/dkvzokno0/video/upload/v1773376622/Kapolla_Intikada_Part-3_trnxkc.mp3",
    },
  ];

  useEffect(() => {
    dispatch({
      type: ACTIONS.SET_SONGS,
      payload: songs,
    });
  }, [dispatch]);

  return {
    songs: state.songs,
    loading: false,
    error: null,
  };
}
