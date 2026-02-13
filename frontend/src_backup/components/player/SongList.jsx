import "../../css/mainArea/SongList.css";

const SongList = ({ songs, onSelectSong }) => {
  if (!songs || songs.length === 0) {
    return <p className="songlist-empty-text">No songs</p>;
  }

  return (
    <table className="songlist-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Artist</th>
          <th>Year</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        {songs.map((song, i) => (
          <tr key={song.id} onClick={() => onSelectSong(i)}>
            <td>{i + 1}</td>
            <td>{song.name}</td>
            <td>{song.artist_name}</td>
            <td>{song.releasedate}</td>
            <td>{song.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SongList;
