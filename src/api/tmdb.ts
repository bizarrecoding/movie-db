import axios from 'axios';
import { Movie, MovieDetails, Pagination } from './types';


const headers = {
  "Content-Type": 'application/json',
  "Accept": 'application/json',
  "Authorization": `Bearer ${process.env.EXPO_PUBLIC_API_ACCESS}`,
}

export const tmdbApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers:{
    common: headers,
  }
});


export const popularMoviesQuery = async () => {
  const { data } = await tmdbApi.get<Pagination<Movie>>("/movie/popular",{
    params:{
      sort_by: "popularity.desc",
    },
    headers, 
  })
  return data;
}

export const nowPlayingMoviesQuery = async () => {
  const { data } = await tmdbApi.get<Pagination<Movie>>("/movie/now_playing");
  return {
    ...data,
    results: data.results.slice(0,6)
  };
}

export const topRatedMoviesQuery = async () => {
  const { data } = await tmdbApi.get<Pagination<Movie>>("/movie/top_rated");
  return {
    ...data,
    results: data.results.slice(0,6)
  };
}

export const upcomingMoviesQuery = async () => {
  const { data } = await tmdbApi.get<Pagination<Movie>>("/movie/upcoming");
  return {
    ...data,
    results: data.results.slice(0,6)
  };
}

export const movieDetailsQuery = async (id: number) => {
  const { data } = await tmdbApi.get<MovieDetails>(`/movie/${id}`,{
    params:{
      append_to_response:"videos"
    }
  });
  return data;
}

export const searchMovieQuery = async (text: string) => {
  const { data } = await tmdbApi.get<Pagination<Movie>>(`/search/movie`,{
    params: {
      query: text,
    }
  })
  return data;
}

 