import React from "react";
import SongCard from "./SongCard";

const SongGrid = ({ songs, onSelectSong }) => {
  return (
    <div className="song-grid">
      {songs.map((song, index) => (
        <SongCard
          key={song.id || index}
          song={song}
          onSelect={() => onSelectSong(index)}
        />
      ))}
    </div>
  );
};

export default SongGrid;
