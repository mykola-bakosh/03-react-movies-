import { useState } from "react"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import Loader from "../Loader/Loader"
import MovieGrid from "../MovieGrid/MovieGrid"
import MovieModal from "../MovieModal/MovieModal"
import SearchBar from "../SearchBar/SearchBar"
import css from "./App.module.css"
import toast, { Toaster } from "react-hot-toast"
import { type Movie } from "../../types/movie"
import { fetchMovies } from "../../services/movieService"

export default function App() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [hasError, setHasError] = useState<boolean>(false)
	const [currentMovie, setCurrentMovie] = useState<Movie | null>(null)
	const showLoader = () => setIsLoading(true)
	const hideLoader = () => setIsLoading(false)
	const modalOpen = () => setIsModalOpen(true)
	const modalClose = () => setIsModalOpen(false)
	const selectMovie = (movie: Movie) => {
		setCurrentMovie(movie)
		modalOpen()
	}

	const [movies, setMovies] = useState<Movie[]>([])

	const searchSubmit = async (query: string) => {
		showLoader()
		setHasError(false)
		setMovies([])
		try {
			const data = await fetchMovies(query)
			if (data.length == 0) {
				toast.error("No movies found for your request.")
				return
			}
			setMovies(data)
		} catch {
			setHasError(true)
		} finally {
			hideLoader()
		}
	}

	return (
		<div className={css.app}>
			<Toaster />
			<SearchBar onSubmit={searchSubmit} />
			<MovieGrid onSelect={selectMovie} movies={movies} />
			{isLoading && <Loader />}
			{hasError && <ErrorMessage />}
			{isModalOpen && currentMovie && (
				<MovieModal onClose={modalClose} movie={currentMovie} />
			)}
		</div>
	)
}
