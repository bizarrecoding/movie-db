import { QueryClient } from "@tanstack/react-query";

const MINUTE = 1000 * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

const tmdbClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * MINUTE, 
      gcTime: DAY,
      refetchOnWindowFocus: false,
      refetchOnReconnect:true,
    },
  } 
})

export default tmdbClient