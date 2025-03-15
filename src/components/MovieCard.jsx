import { Link } from "react-router-dom";

function MovieCard({ movie, size }) {
	const movieId = movie.tmdbId ?? movie._id ?? movie.id;

	const imageSizeClass = size === "extra-small" ? "w-16 h-24" : "w-full h-auto";
	const posterUrl = movie.poster_path
		? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
		: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='750' viewBox='0 0 500 750'%3E%3Crect width='500' height='750' fill='%23cccccc'/%3E%3Ctext x='50%' y='50%' font-size='20' text-anchor='middle' fill='%23ffffff'%3ENo+Image%3C/text%3E%3C/svg%3E";

	return (
		<Link to={`/movies/${movieId}`} className="block max-w-[200px]">
			<li key={movieId}>
				<img
					className={`${imageSizeClass} object-cover rounded-md shadow-lg mb-2`}
					src={posterUrl}
					alt={movie.title || "No poster available"}
				/>
			</li>
			<h3 className="text-xl font-bold tracking-tight text-white">
				{movie.title}
			</h3>
		</Link>
	);
}

export default MovieCard;
