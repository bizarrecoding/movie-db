import { MovieDetails } from "../../api/types"

export const getMainGenre = (movie?: MovieDetails) => {
  const [main] = movie?.genres ?? []
  if (main) return main.name
  return ""
}
 
export const getReleaseYear = (date?: string) => {
  if(!date) return "NaN"
  const release = new Date(date)
  return release.getFullYear()
}