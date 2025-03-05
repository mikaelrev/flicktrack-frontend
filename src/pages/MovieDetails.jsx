import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import AddCommentForm from "../components/AddCommentForm";
import AlertNotification from "../components/AlertNotification";
import CommentItem from "../components/CommentItem";
import Button from "../components/Button";
import AddToListForm from "../components/AddToListForm";

function MovieDetails() {
	const { movieId } = useParams();
	const [movie, setMovie] = useState("");
	const [isChecked, setIsChecked] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState("");
	const [isListModalOpen, setIsListModalOpen] = useState(false);

	const token = localStorage.getItem("token");
	const userId = localStorage.getItem("userId");

	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	const fetchMovie = useCallback(async () => {
		try {
			const movieResponse = await axios.get(
				`http://localhost:3000/movies/${movieId}`
			);
			setMovie(movieResponse.data);

			const userCheckedResponse = await axios.get(
				`http://localhost:3000/users/${userId}/checked`
			);
			const userCheckedMovies = userCheckedResponse.data.checkedMovies;

			setIsChecked(
				userCheckedMovies
					.map((movie) => movie._id)
					.includes(movieResponse.data._id)
			);

			const userFavoritesResponse = await axios.get(
				`http://localhost:3000/users/${userId}/favorites`
			);

			const userFavoriteMovies = userFavoritesResponse.data.favoriteMovies;

			setIsFavorite(
				userFavoriteMovies
					.map((movie) => movie._id)
					.includes(movieResponse.data._id)
			);
		} catch (error) {
			console.error("Error fetching movie or user data:", error);
		}
	}, [movieId, userId]);

	useEffect(() => {
		fetchMovie();
	}, [fetchMovie]);

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

	const addMovieToFavorites = async () => {
		setIsLoading(true);
		try {
			await axios.post(
				`http://localhost:3000/users/movies/${movie._id}/favorites`,
				{},
				config
			);
			setIsFavorite(true);
			setNotificationMessage("Movie has been added to favorites");
		} catch (error) {
			console.error("Error adding movie to favorite list:", error);
		}
		setIsLoading(false);
	};

	const removeMovieFromFavorites = async () => {
		setIsLoading(true);
		try {
			await axios.delete(
				`http://localhost:3000/users/movies/${movie._id}/favorites`,
				config
			);
			setIsFavorite(false);
			setNotificationMessage("Movie has been removed from favorites");
		} catch (error) {
			console.error("Error removing movie from favorite list:", error);
		}
		setIsLoading(false);
	};

	if (!movie) return <div>Loading...</div>;

	return (
		<div className="flex flex-col max-w-4xl mx-auto p-6">
			<div>
				<div className="flex flex-col items-center md:flex-row gap-8 mb-5">
					<img
						className="w-64 h-96 object-cover rounded-lg shadow-lg"
						src={movie.posterUrl}
						alt={movie.title}
					/>

					<div className="flex flex-col justify-between">
						<h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
						<p className="text-lg text-gray-600 mb-2">{movie.releaseYear}</p>
						<p className="text-lg text-gray-600 mb-4">
							{movie.runtime} minutes
						</p>
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
					<Button
						onClick={!isChecked ? addMovieToChecked : removeMovieFromChecked}
						isLoading={isLoading}
					>
						{isLoading
							? "Processing..."
							: isChecked
							? "Remove from checked"
							: "Check movie"}
					</Button>
					<Button
						bgColor="cyan"
						isLoading={isLoading}
						onClick={
							!isFavorite ? addMovieToFavorites : removeMovieFromFavorites
						}
					>
						{isLoading
							? "Processing..."
							: isFavorite
							? "Remove from Favorites"
							: "Add to Favorites"}
					</Button>
					<Button bgColor="tomato" onClick={() => setIsListModalOpen(true)}>
						Add to a list
					</Button>
				</div>

				{isListModalOpen && (
					<AddToListForm
						isOpen={isListModalOpen}
						onClose={() => setIsListModalOpen(false)}
						config={config}
						userId={userId}
						token={token}
						movieId={movie._id}
						setNotificationMessage={setNotificationMessage}
					/>
				)}

				{notificationMessage && (
					<AlertNotification
						message={notificationMessage}
						onClose={() => setNotificationMessage("")}
					/>
				)}
			</div>

			<div className="mt-5 flex flex-col gap-3">
				<div className="mb-5">
					<AddCommentForm movieId={movie._id} onCommentAdded={fetchMovie} />
				</div>
				{movie.comments.length === 0 ? (
					<p>{`${movie.title} doesn't have any comments`}</p>
				) : (
					movie.comments.map((comment) => {
						return <CommentItem key={comment._id} comment={comment} />;
					})
				)}
			</div>
		</div>
	);
}

export default MovieDetails;
