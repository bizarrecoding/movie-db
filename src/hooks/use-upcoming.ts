import { useQuery } from '@tanstack/react-query';
import { upcomingMoviesQuery } from '../api/tmdb';

export const useUpcomingMovies = () => {
  return useQuery({ queryKey: ['movies-upcoming'], queryFn: upcomingMoviesQuery });
}
