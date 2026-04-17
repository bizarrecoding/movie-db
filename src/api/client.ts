import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from "@tanstack/react-query";


const MINUTE = 1000 * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

const tmdbClient = new QueryClient({
  defaultOptions: {
    queries: {
      /**
       *  setting a shot stale time and a long eviction time for query results 
       *  this will be part of the data persist layer and also improve repeated
       *  request responses if queryKeys have not changed
       */
      staleTime: 5 * MINUTE, 
      gcTime: DAY,
      networkMode: "offlineFirst",
      refetchOnWindowFocus: false,
      refetchOnReconnect:true,
    },
  } 
})

export default tmdbClient

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
})

export const persistOptions = {
  persister: asyncStoragePersister
}