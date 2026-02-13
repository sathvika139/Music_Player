import { FiPlay, FiHeart } from "react-icons/fi";
import "../../css/songs/SongCard.css";

const SongCard = ({ song, onSelect }) => {
  return (
    <div className="songcard-root" onClick={onSelect}>
      <img
        src={song.image || "/placeholder.jpg"}
        alt={song.name}
        className="songcard-img"
      />

      <div className="songcard-info">
        <h4>{song.name}</h4>
        <p>{song.artist_name}</p>
      </div>

      <div className="songcard-actions">
        <FiPlay />
        <FiHeart />
      </div>
    </div>
  );
};

export default SongCard;
