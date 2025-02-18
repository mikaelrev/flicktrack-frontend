import MovieCard from "../components/MovieCard";

function Movies({ movies }) {
	return (
		<div className="md:container md:mx-auto flex flex-col items-center justify-center p-5 mt-5">
			<ul className="grid grid-cols-6 gap-5">
				{movies.map((movie) => (
					<MovieCard movie={movie} key={movie.id} />
				))}
			</ul>
		</div>
	);
}
export default Movies;
