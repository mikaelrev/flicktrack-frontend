import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ListItem from "../components/ListItem";
import UserInfo from "../components/UserInfo";
import axios from "axios";
import CheckedMovieItem from "../components/CheckedMovieItem";
import FavoriteMovieItem from "../components/FavoriteMovieItem";

function Profile() {
	const { userId } = useParams();
	const [checkedMovies, setCheckedMovies] = useState([]);
	const [favoriteMovies, setFavoriteMovies] = useState([]);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const [isFollowing, setIsFollowing] = useState("");

	const activeUser = localStorage.getItem("userId") || "";
	const token = localStorage.getItem("token");

	const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

	const fetchUser = useCallback(async (userId) => {
		try {
			const response = await axios(`http://localhost:3000/users/${userId}`);
			setUser(response.data.user);
		} catch (err) {
			console.log(err);
		}
	}, []);

	const fetchCheckedMovies = async (userId) => {
		try {
			const response = await axios(
				`http://localhost:3000/users/${userId}/checked`
			);

			const checkedResponse = response.data.checkedMovies;
			const sortedCheckedMovies = checkedResponse.reverse();
			setCheckedMovies(sortedCheckedMovies);
		} catch (err) {
			setError(err.message);
		}
	};

	const fetchFavoriteMovies = async (userId) => {
		try {
			const response = await axios(
				`http://localhost:3000/users/${userId}/favorites`
			);

			const favoritesResponse = response.data.favoriteMovies;
			const sortedFavoriteMovies = favoritesResponse.reverse();
			setFavoriteMovies(sortedFavoriteMovies);
		} catch (err) {
			setError(err.message);
		}
	};

	const handleFollowUser = async () => {
		try {
			await axios.post(
				`http://localhost:3000/users/${userId}/follow`,
				{},
				config
			);

			setIsFollowing(true);
		} catch (err) {
			setError(err.message);
		}
	};

	const handleUnfollowUser = async () => {
		try {
			await axios.post(
				`http://localhost:3000/users/${userId}/unfollow`,
				{},
				config
			);

			setIsFollowing(false);
		} catch (err) {
			setError(err.message);
		}
	};

	useEffect(() => {
		fetchUser(userId);
		fetchCheckedMovies(userId);
		fetchFavoriteMovies(userId);
	}, [userId, fetchUser]);

	if (error) {
		return <p>Error: {error}</p>;
	}

	if (!user) {
		return <p>Loading...</p>;
	}

	console.log(user);

	return (
		<div>
			<div className="flex justify-between items-start w-full">
				<UserInfo user={user} />
				{activeUser !== user._id &&
					(isFollowing === true ? (
						<button
							onClick={handleUnfollowUser}
							className="bg-[#d9674e] text-white font-bold py-2 px-6 m-5 rounded text-lg hover:bg-[#b4563d]"
						>
							Unfollow
						</button>
					) : (
						<button
							onClick={handleFollowUser}
							className="bg-[#d9674e] text-white font-bold py-2 px-6 m-5 rounded text-lg hover:bg-[#b4563d]"
						>
							Follow
						</button>
					))}
			</div>

			<hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
			<div className="flex justify-between gap-1">
				<div className="bg-gray-100 p-3 rounded mb-4 flex-1">
					<h2 className="text-3xl font-extrabold text-gray-700">
						Checked movies:
					</h2>
					<div className="flex flex-col">
						{checkedMovies.slice(0, 3).map((movie) => {
							return <CheckedMovieItem movie={movie} key={movie._id} />;
						})}
					</div>

					{checkedMovies.length > 3 && (
						<Link
							to={`/profile/${user._id}/checkedmovies`}
							className="text-blue-500 mt-3 inline-block hover:underline"
						>
							View All Checked Movies →
						</Link>
					)}
				</div>
				<div className="bg-gray-100 p-3 rounded mb-4 flex-1">
					<h2 className="text-3xl font-extrabold text-gray-700">
						Favorite movies:
					</h2>
					<div className="flex flex-col">
						{favoriteMovies.slice(0, 3).map((movie) => {
							return <FavoriteMovieItem movie={movie} key={movie._id} />;
						})}
					</div>

					{favoriteMovies.length > 3 && (
						<Link
							to={`/profile/${user._id}/favoritemovies`}
							className="text-blue-500 mt-3 inline-block hover:underline"
						>
							View All Favorite Movies →
						</Link>
					)}
				</div>
			</div>

			<div className="bg-gray-100 p-3 rounded">
				<h2 className="text-3xl font-extrabold text-gray-700">Lists:</h2>
				{user.lists.length === 0
					? "No lists found"
					: user.lists.map((list) => (
							<div key={list._id} className="py-5">
								<ListItem list={list} />
							</div>
					  ))}
			</div>
			<div className="flex flex-col gap-5 bg-gray-100 p-3 rounded-md mt-5">
				<h2 className="text-3xl font-extrabold text-gray-700">Comments:</h2>
				{user.comments.length === 0 ? (
					<p>No comments yet.</p>
				) : (
					user.comments.map((comment) => (
						<div key={comment._id} className="flex flex-col gap-3 px-3">
							<div className="flex flex-col">
								<p className="font-bold mb-3">
									Movie comment on{" "}
									<Link
										to={`/movies/${comment.movie.tmdbId}`}
										className="text-blue-500"
									>
										{comment.movie?.title}
									</Link>
								</p>
								<div className="flex items-center gap-3">
									<img
										src={comment.movie?.posterUrl}
										alt={comment.movie?.title}
										className="w-20 h-30"
									/>
									<p>{comment.content}</p>
								</div>
							</div>
							<hr className="my-3 border-t border-gray-200 dark:border-gray-700" />
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default Profile;
