import { useQuery } from '@tanstack/react-query';
import { movieDetailsQuery } from '../api/tmdb';

export const useMovie = (id: number) => {
  return useQuery({ queryKey: ['movie',id], queryFn: ()=>movieDetailsQuery(id) });
}
