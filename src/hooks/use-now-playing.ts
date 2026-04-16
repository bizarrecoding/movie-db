import { useQuery } from '@tanstack/react-query';
import { nowPlayingMoviesQuery } from '../api/tmdb';

export const useNowPlayingMovies = () => {
  return useQuery({ queryKey: ['movies-playing'], queryFn: nowPlayingMoviesQuery });
}
