import { useQuery } from '@tanstack/react-query'
import { searchMovieQuery } from '../api/tmdb'

export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: ()=>searchMovieQuery(query),
    gcTime: 300_000,
    staleTime:30_000,
    enabled: (query?.length ?? 0) > 2
  })
}
