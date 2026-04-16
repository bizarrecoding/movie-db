export type Movie = {
  id: number
  title: string
  poster_path: string
  //
  backdrop_path: string
  original_language: string
  original_title: string
  popularity: number
  genre_ids: number[]
  overview: string
  release_date: string
  vote_average: number
  vote_count: number
  video: boolean
}
export type Genre = {
  id: number
  name: string
}

export type MovieDetails = Movie & {
  adult: boolean
  budget: number
  genres: Genre[]
  homepage: string
  runtime: number
}

export type Pagination<T = Movie> = {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export type MovieVideo = {
  id: string
  name: string
  key: string
  site: string
  type: string
  official: boolean
  published_at: string
}