import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Movies() {
	const [movies, setMovies] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [searchParams, setSearchParams] = useSearchParams();

	const page = parseInt(searchParams.get("page")) || 1;

	const fetchMovies = async (page) => {
		const res = await fetch(
			`https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${TMDB_API_KEY}`
		);
		const data = await res.json();
		setMovies(data.results);
		setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
	};

	useEffect(() => {
		fetchMovies(page);
	}, [page]);

	const goToPage = (newPage) => {
		setSearchParams({ page: newPage });
	};

	return (
		<div className="md:container md:mx-auto flex flex-col items-center justify-center p-5 mt-5">
			<ul className="grid grid-cols-5 gap-5">
				{movies.map((movie) => (
					<MovieCard movie={movie} key={movie.id} />
				))}
			</ul>

			<Pagination {...{ totalPages, page, goToPage }} />
		</div>
	);
}
export default Movies;
