import { useState } from 'react';
import { albumList, artistList, genreList } from '../assets/additionalAssets';
import { songList } from '../assets/songList';
import { AudioPlayer } from '../components/AudioPlayer';
import { FilterInput } from '../components/FilterInput';

export default function Home() {
  const [activeSong, setActiveSong] = useState(songList[0]);
  const [genreFilter, setGenreFilter] = useState('');
  const [artistFilter, setArtistFilter] = useState('');
  const [albumFilter, setAlbumFilter] = useState('');
  return (
    <div>
      <header>
        <img src="/play.svg" alt="play" />
        <h1>SOUNDIFY</h1>
      </header>
      <AudioPlayer activeSong={activeSong} />
      <section className="filter-section">
        <FilterInput
          options={genreList} // genreList from assets directory
          value={genreFilter} // genreFilter from useState()
          filterSetter={setGenreFilter} // setGenreFilter from useState()
          name="genre"
        />
        <FilterInput
          options={artistList} // artistList from assets directory
          value={artistFilter} // artistFilter from useState()
          filterSetter={setArtistFilter} // setArtistFilter from useState()
          name="artist"
        />
        <FilterInput
          options={albumList} // albumList from assets directory
          value={albumFilter} // albumFilter from useState()
          filterSetter={setAlbumFilter} // setAlbumFilter from useState()
          name="album"
        />
      </section>
      <div className="song-list">
        <div className="song-header">
          <div>Name</div>
          <div>Album</div>
          <div>Year</div>
          <div>Artist</div>
          <div>Play</div>
          <div>Genre</div>
        </div>
        {songList
          .filter((song) => {
            let isVisible = true; // by default all songs are visible

            // if there is a genre selected and this don't match to the genre of this song hide the song
            if (genreFilter && genreFilter !== song.genre) {
              isVisible = false;
            }
            // if there is a artist selected and this don't match to the artist of this song hide the song
            if (artistFilter && artistFilter !== song.artist) {
              isVisible = false;
            }
            // if there is a album selected and this don't match to the album of this song hide the song
            if (albumFilter && albumFilter !== song.album) {
              isVisible = false;
            }

            // Apply the same pattern for artist and album

            return isVisible;
          })
          .map((song) => {
            return (
              <div
                key={song.id}
                className="song-container"
                onDoubleClick={() => {
                  setActiveSong(song);
                }}
              >
                <div className="song-title">{song.name}</div>
                <div>{song.album}</div>
                <div>{song.release}</div>
                <div>{song.artist}</div>
                <button
                  className="song-play"
                  onClick={() => {
                    setActiveSong(song);
                  }}
                >
                  <img src="/play.svg" alt="play" />
                </button>
                <div>{song.genre}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

// ⚠️⚠️⚠️
// ⚠️⚠️⚠️ PLEASE IGNORE this section until you have completed steps  1, 2 and 3 ⚠️⚠️⚠️
// ⚠️⚠️⚠️
//
// --------------- Step 4 --------------
//
// Now, we are going to connect our front-end and back-end.
// Using Get Server Side Props (aka. GSSp) get the app data from the database instead of the assets files.
//
// 1. Import the database Util functions from utils/database.js
// 2. Get the data for the app. (albumList, artistList, genreList, songList)
// 3. Pass the data to the Page Component through props object
// 4. modify the code in the Home component to receive the data from database instead of assets
// 5. remove assets directory and the
