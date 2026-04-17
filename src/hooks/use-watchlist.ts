import { useQuery } from "@tanstack/react-query"
import { getWatchlistMovies } from "../db/client"

export const useWatchlist = () => {  
  return useQuery({
    queryKey: ["watchlist"],
    queryFn: ()=>getWatchlistMovies(),
    refetchOnWindowFocus: true,
  })
}
