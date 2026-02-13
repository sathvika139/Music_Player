import React, { useState } from "react";
import { useSelector } from "react-redux";

import SideMenu from "../components/layout/SideMenu";
import MainArea from "../components/layout/MainArea";
import Footer from "../components/layout/Footer";
import useAudioPlayer from "../hooks/useAudioPlayer";

const Homepage = () => {
  const [view, setView] = useState("home");

  // ✅ SINGLE SOURCE OF TRUTH (Redux)
  const { isAuthenticated } = useSelector((state) => state.auth);

  const songs = [
    {
      id: 1,
      name: "Believer",
      artist_name: "Imagine Dragons",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      releasedate: "2017",
      duration: "04:30",
    },
  ];

  const audioPlayer = useAudioPlayer(songs);

  return (
    <div className="homepage-root">
      {/* ✅ SideMenu only AFTER login */}
      {isAuthenticated && <SideMenu setView={setView} view={view} />}

      {/* ✅ MainArea always exists */}
      <MainArea
        view={view}
        songs={songs}
        onSelectSong={audioPlayer.playSongAtIndex}
      />

      {/* ✅ Footer only AFTER login */}
      {isAuthenticated && <Footer audioPlayer={audioPlayer} />}
    </div>
  );
};

export default Homepage;
