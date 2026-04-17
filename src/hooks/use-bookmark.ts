import { useLocalSearchParams } from "expo-router"
import { useCallback, useEffect, useState } from "react"
import { MovieDetails } from "../api/types"
import { findMovie, removeMovie, saveMovie } from "../db/client"

export const useBookmark = () => {
  const [bookmarked, setBookmarked] = useState(false)
  const { id } = useLocalSearchParams() as { id: string }

  const isBookmarked = useCallback(async (id: string|number) => {
    const movie_id = Number(id)
    if (movie_id && !isNaN(movie_id)) {
      const exist = await findMovie(movie_id)
      setBookmarked(!!exist)
    }
  },[])

  useEffect(() => {
    isBookmarked(id)
  }, [id, isBookmarked])

  const toggle = useCallback(
    async (data?: MovieDetails) => {
      if (!data) return
      if (!bookmarked) await saveMovie(data)
      else await removeMovie(data.id)
      //sync ui state with source
      isBookmarked(data.id)
    },
    [bookmarked, isBookmarked],
  )

  return {
    bookmarked,
    toggle,
  }
}