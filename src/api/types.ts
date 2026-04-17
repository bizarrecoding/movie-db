// used for sql
export type StoredMovie = {
  id: number
  title: string
  poster_path: string 
  backdrop_path: string 
  popularity: number 
  overview: string
  release_date: string
  vote_average: number 
  genre: string
  runtime: number
  video: number
}

export type Movie = {
  id: number
  title: string
  poster_path: string 
  backdrop_path: string 
  popularity: number 
  overview: string
  release_date: string
  vote_average: number 
  video: boolean
}
export type Genre = {
  id: number
  name: string
}

export type MovieDetails = Movie & {
  genres: Genre[]
  runtime: number
  videos?: {
    results: MovieVideo[]
  }
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
export type GenreList = {
  genres: Genre[]
}