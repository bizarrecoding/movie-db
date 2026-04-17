import { useQuery } from '@tanstack/react-query';
import { movieVideoQuery } from '../api/tmdb';

export const useMedia = (movie_id: number) => {
  return useQuery({ queryKey: ['media',movie_id], queryFn: ()=>movieVideoQuery(movie_id) });
}
