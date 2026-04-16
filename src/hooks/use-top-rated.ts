import { useQuery } from '@tanstack/react-query';
import { topRatedMoviesQuery } from '../api/tmdb';

export const useTopRatedMovies = () => {
  return useQuery({ queryKey: ['movies-top'], queryFn: topRatedMoviesQuery });
}
