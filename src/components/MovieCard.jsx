import { Link } from "react-router-dom";

function MovieCard({ movie }) {
	return (
		<Link to={`/movies/${movie.id}`}>
			<li key={movie.id}>
				<h3>{movie.title}</h3>
				<img
					className="w-full h-auto rounded-md shadow-lg"
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				/>
			</li>
		</Link>
	);
}
export default MovieCard;
