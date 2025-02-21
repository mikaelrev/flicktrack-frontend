import { Link } from "react-router-dom";

function MovieCard({ movie, size }) {
	const movieId = movie.id === undefined ? movie._id : movie.id;

	const imageSizeClass = size === "extra-small" ? "w-16 h-24" : "w-full h-auto";

	return (
		<Link to={`/movies/${movieId}`} className="block max-w-[200px]">
			<li key={movieId}>
				<img
					className={`${imageSizeClass} object-cover rounded-md shadow-lg mb-2`}
					src={`https://image.tmdb.org/t/p/w500${
						movie.poster_path === undefined
							? movie.posterUrl
							: movie.poster_path
					}`}
				/>
			</li>
			<h3 className="text-xl font-bold tracking-tight text-gray-700 dark:text-white">
				{movie.title}
			</h3>
		</Link>
	);
}
export default MovieCard;
