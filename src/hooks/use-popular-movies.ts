import { useQuery } from '@tanstack/react-query';
import { popularMoviesQuery } from '../api/tmdb';

export const usePopularMovies = () => {
  return useQuery({ queryKey: ['movies-popular'], queryFn: popularMoviesQuery });
}
