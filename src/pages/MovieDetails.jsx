import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddCommentForm from "../components/AddCommentForm";
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
			console.log(movieResponse.data);
		} catch (error) {
			console.error("Error fetching movie or user data:", error);
		}
	};

	useEffect(() => {
		fetchMovie();
	}, [movieId]);

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
			<div className="mt-5 flex flex-col gap-3">
				<div className="mb-5">
					<AddCommentForm movieId={movie._id} onCommentAdded={fetchMovie} />
				</div>
				{movie.comments.length === 0 ? (
					<p>{`${movie.title} doesn't have any comments`}</p>
				) : (
					movie.comments.map((comment) => (
						<Link
							to={`/profile/${comment.user._id}`}
							key={comment._id}
							className="flex items-center bg-gray-200 p-5 gap-3 rounded"
						>
							<img
								src={
									comment.user.profileImage === null
										? "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
										: comment.user.profileImage
								}
								className="h-20 w-20 object-cover rounded-full"
								alt={`${comment.user.username}'s profile picture`}
							/>
							<div className="flex flex-col">
								<p className="text-sm text-gray-500">{comment.user.username}</p>
								<p>{comment.content}</p>
							</div>
						</Link>
					))
				)}
			</div>
		</div>
	);
}

export default MovieDetails;
