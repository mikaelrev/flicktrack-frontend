import { Link } from "react-router-dom";

function CheckedMovieItem({ movie }) {
	return (
		<Link
			to={`/movies/${movie.tmdbId}`}
			key={movie._id}
			className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded transition"
		>
			<img
				className="h-30 w-15 object-contain"
				src={movie.posterUrl}
				alt={`Poster for ${movie.title}`}
			/>
			<p className="font-semibold">{movie.title}</p>
		</Link>
	);
}
export default CheckedMovieItem;
