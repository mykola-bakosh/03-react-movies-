import axios from "axios"
import { type Movie } from "../types/movie"

axios.defaults.baseURL = "https://api.themoviedb.org/3/"
axios.defaults.headers["Authorization"] = `Bearer ${
	import.meta.env.VITE_TMDB_TOKEN
}`

interface FetchMovies {
	page: number
	results: Movie[]
	total_pages: number
	total_results: number
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
	const {
		data: { results },
	} = await axios<FetchMovies>("search/movie", {
		params: {
			query,
		},
	})
	return results
}
