import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AlertNotification from "../components/AlertNotification";

function MovieDetails() {
	const { movieId } = useParams();
	const [movie, setMovie] = useState("");
	const [isChecked, setIsChecked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState("");

	const token = localStorage.getItem("token");
	const userId = localStorage.getItem("userId");

	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const movieResponse = await axios.get(
					`http://localhost:3000/movies/${movieId}`
				);
				setMovie(movieResponse.data);

				const userResponse = await axios.get(
					`http://localhost:3000/users/${userId}/checked`
				);
				const userCheckedMovies = userResponse.data.checkedMovies;

				setIsChecked(
					userCheckedMovies
						.map((movie) => movie._id)
						.includes(movieResponse.data._id)
				);
			} catch (error) {
				console.error("Error fetching movie or user data:", error);
			}
		};

		fetchMovie();
	}, [movieId, userId]);

	const addMovieToChecked = async () => {
		setIsLoading(true);
		try {
			await axios.post(
				`http://localhost:3000/users/movies/${movie._id}/checked`,
				{},
				config
			);
			setIsChecked(true);
			setNotificationMessage("Movie has been checked");
		} catch (error) {
			console.error("Error adding movie to checked list:", error);
		}
		setIsLoading(false);
	};

	const removeMovieFromChecked = async () => {
		setIsLoading(true);
		try {
			await axios.delete(
				`http://localhost:3000/users/movies/${movie._id}/checked`,
				config
			);
			setIsChecked(false);
			setNotificationMessage("Movie has been unchecked");
		} catch (error) {
			console.error("Error removing movie from checked list:", error);
		}
		setIsLoading(false);
	};

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
				<button
					className="p-5 bg-gray-200"
					onClick={!isChecked ? addMovieToChecked : removeMovieFromChecked}
					disabled={isLoading}
				>
					{isLoading
						? "Processing..."
						: isChecked
						? "Remove from checked"
						: "Check movie"}
				</button>
			</div>

			{notificationMessage && (
				<AlertNotification
					message={notificationMessage}
					onClose={() => setNotificationMessage("")}
				/>
			)}
		</div>
	);
}

export default MovieDetails;
