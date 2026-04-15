import axios from 'axios';
import { Movie, MovieDetails, MovieVideo, Pagination } from './types';


export const tmdbApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  params: {
    api_key: process.env.EXPO_PUBLIC_API_KEY,
  },
});


export const poplarMoviesQuery = async () => {
  const { data } = await axios.get<Pagination<Movie>>("/movie/popular");
  return data;
}

export const nowPlayingMoviesQuery = async () => {
  const { data } = await axios.get<Pagination<Movie>>("/movie/now_playing");
  return data;
}

export const topRatedMoviesQuery = async () => {
  const { data } = await axios.get<Pagination<Movie>>("/movie/top_rated");
  return data;
}

export const upcomingMoviesQuery = async () => {
  const { data } = await axios.get<Pagination<Movie>>("/movie/upcoming");
  return data;
}

export const movieDetailsQuery = async (id: number) => {
  const { data } = await axios.get<MovieDetails>(`/movie/${id}`);
  return data;
}

export const movieVideoQuery = async (id: number) => {
  const { data } = await axios.get<Pagination<MovieVideo>>(`/movie/${id}/videos`);
  return data;
}


