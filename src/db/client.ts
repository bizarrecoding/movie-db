import * as SQLite from 'expo-sqlite';
import { MovieDetails, StoredMovie } from '../api/types';

const DB_NAME = "pocket-movie.db";
let db: SQLite.SQLiteDatabase|null = null;

export const getDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync(DB_NAME);
  }
  return db;
}

 
export const initDB = async () => {
  let db = await getDB()
  await db?.execAsync(`
    CREATE TABLE IF NOT EXISTS WATCHLIST (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      poster_path TEXT NOT NULL, 
      backdrop_path TEXT NOT NULL,
      popularity REAL,
      overview TEXT,
      release_date TEXT,
      vote_average REAL,
      genre TEXT,
      runtime INTEGER,
      video INTEGER DEFAULT 0 
    )
  `);
}  

export const saveMovie = async (movie: MovieDetails) => {
  const sql = `INSERT OR REPLACE INTO WATCHLIST (
    id, title, poster_path, backdrop_path, popularity, overview, release_date, 
    vote_average, genre, runtime, video
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
   
  const params = [
    movie.id,
    movie.title,
    movie.poster_path,
    movie.backdrop_path,
    movie.popularity,
    movie.overview,
    movie.release_date,
    movie.vote_average ?? 0.0,
    movie.genres.at(0)?.name ?? "",
    movie.runtime ?? 0,
    movie.video ? 1 : 0
  ] 
  await db?.runAsync(sql,params) 
}

const mapStoredToReal = (entry?: StoredMovie|null): MovieDetails|null =>{
  if(!entry) return null;
  return {
    ...entry,
    genres: [{id: 1, name:entry?.genre ?? ""}],
    video: !!entry?.video
  } as MovieDetails
}


export const findMovie = async (movie_id: number) => {
  const data = await db?.getFirstAsync<StoredMovie>(`SELECT * FROM WATCHLIST WHERE id = ?`, [movie_id]) 
  return mapStoredToReal(data)
}

export const removeMovie = async (movie_id: number) => {
  await db?.getFirstAsync(`DELETE FROM WATCHLIST WHERE id = ?`, [movie_id]) 
}


export const getWatchlistMovies = async () => {
  const data = await db?.getAllAsync<StoredMovie>(`SELECT * FROM WATCHLIST LIMIT 40`) 
  if(!data) return []
  return data.map(mapStoredToReal).filter(Boolean) as MovieDetails[]
  
}
