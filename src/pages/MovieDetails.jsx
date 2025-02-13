import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function MovieDetails() {
	const { movieId } = useParams();
	const [movie, setMovie] = useState(null);

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3000/movies/${movieId}`
				);
				setMovie(response.data);
			} catch (error) {
				console.error("Error fetching movie:", error);
			}
		};

		fetchMovie();
	}, [movieId]);

	console.log(movie);

	if (!movie) return <div>Loading...</div>;

	return (
		<div className="max-w-4xl mx-auto p-6">
			<div className="flex flex-col items-center md:flex-row gap-8">
				<img
					className="w-64 h-96 object-cover rounded-lg shadow-lg"
					src={movie.posterUrl}
					alt={movie.title}
				/>

				<div className="flex flex-col justify-between">
					<h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
					<p className="text-lg text-gray-600 mb-2">{movie.releaseYear}</p>
					<p className="text-lg text-gray-600 mb-4">{movie.runtime} minutes</p>
					<p className="text-lg text-gray-600 mb-2">
						<span className="font-semibold">Directed by:</span>{" "}
						{movie.directedBy}
					</p>
					<p className="text-lg text-gray-600 mb-4">
						<span className="font-semibold">Genres:</span>{" "}
						{movie.genre.join(", ")}
					</p>
					<p className="text-lg text-gray-600">
						<span className="font-semibold">Cast:</span>{" "}
						{movie.actors.join(", ")}
					</p>
				</div>
			</div>
		</div>
	);
}

export default MovieDetails;
