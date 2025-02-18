import { Link } from "react-router-dom";

function MovieCard({ movie }) {
	return (
		<Link to={`/movies/${movie.id}`}>
			<li key={movie.id}>
				<img
					className="w-full h-auto rounded-md shadow-lg mb-2"
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				/>
			</li>
			<h3 className="text-xl font-bold tracking-tight text-gray-700 dark:text-white">
				{movie.title}
			</h3>
		</Link>
	);
}
export default MovieCard;
