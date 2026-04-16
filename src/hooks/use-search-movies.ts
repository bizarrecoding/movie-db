import { useQueries, useQuery } from '@tanstack/react-query'
import { movieDetailsQuery, searchMovieQuery } from '../api/tmdb'

/*
 * basic search query does not return the following attributes
 * - runtime
 * - genres
 * 
 * We can prefetch a list of genres and use the cache as a map, but theres no alternative 
 * for the runtime value. Instead fetching the complete movie details, although 
 * introducing an N+1 issue, will to the work in this case.
 */

export const useSearchMovies = (query: string) => {
  const {data, isLoading, error} = useQuery({
    queryKey: ['search', query],
    queryFn: ()=>searchMovieQuery(query),
    gcTime: 300_000,
    staleTime:30_000,
    enabled: (query?.length ?? 0) > 2
  })

  const ids = data?.results.map(m=>m.id) ?? []

  const followUpQuery = useQueries({
    queries: ids?.map((id=>({
      queryKey: ["movie", id],
      queryFn: ()=>movieDetailsQuery(id)
    }))),
    combine: (res)=>{
      return {
        results: res.map(r=>r.data),
        isLoading: res.some(r=>r.isPending||r.isLoading),
        error: res.filter(r=>r.error) as unknown as Error[]
      }
    },
  })

  return {
    data: followUpQuery,
    isLoading: isLoading || followUpQuery.isLoading,
    error: error || followUpQuery.error.at(0)
  }
}
