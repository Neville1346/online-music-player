import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MusicPlayerComponent() {
  const [playlists, setPlaylists] = useState([]);
  const [newSong, setNewSong] = useState('');
  const [newPlaylist, setNewPlaylist] = useState('');

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/playlists', {
      headers: { Authorization: token }
    });
    setPlaylists(response.data);
  };

  const handleAddSong = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/playlist', {
      playlistName: newPlaylist,
      song: newSong
    }, { headers: { Authorization: token } });
    fetchPlaylists();
  };

  return (
    <div>
      <h2>Music Player</h2>
      <form onSubmit={handleAddSong}>
        <input
          type="text"
          placeholder="Playlist Name"
          value={newPlaylist}
          onChange={(e) => setNewPlaylist(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Song Name"
          value={newSong}
          onChange={(e) => setNewSong(e.target.value)}
          required
        />
        <button type="submit">Add Song</button>
      </form>

      <h3>Your Playlists</h3>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist._id}>
            {playlist.name}
            <ul>
              {playlist.songs.map((song, index) => (
                <li key={index}>{song}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MusicPlayerComponent;
