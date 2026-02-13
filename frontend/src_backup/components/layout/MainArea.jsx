import { useSelector } from "react-redux"; // ✅ FIX
import SongList from "../player/SongList";
import SongGrid from "../songs/SongGrid";

const MainArea = ({ songs, onSelectSong, view }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return (
      <div className="mainarea-root">
        <h2>Please login or signup to continue</h2>
      </div>
    );
  }

  return (
    <div className="mainarea-root">
      {(view === "home" || view === "search") && (
        <SongList songs={songs} onSelectSong={onSelectSong} />
      )}

      {view === "favourite" && (
        <SongGrid songs={songs} onSelectSong={onSelectSong} />
      )}
    </div>
  );
};

export default MainArea;
