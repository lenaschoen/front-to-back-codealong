import camelcaseKeys from 'camelcase-keys';
import { sql } from './postgresConfig';

export async function getArtists() {
  const artists = await sql`
  SELECT * FROM artists
  `;
  return artists;
}

export async function getAlbums() {
  const albums = await sql`
  SELECT * FROM albums
  `;
  return albums;
}

export async function getGenres() {
  const genres = await sql`
  SELECT * FROM genres
  `;
  return genres;
}

export async function getSongs() {
  const songs = await sql`
SELECT
  s.id,
  s.name,
  s.slug,
  g.name as genre,
  ar.name as artist,
  al.name as album,
  al.year as release
FROM
  songs as s,
  genres as g,
  artists as ar,
  albums as al
WHERE
  s.genre_id = g.id
AND
  s.artist_id = ar.id
AND
  s.album_id = al.id
`;
  return songs.map((song) => camelcaseKeys(song));
}
