import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ListItem from "../components/ListItem";
import UserInfo from "../components/UserInfo";
import axios from "axios";

function Profile() {
	const { userId } = useParams();
	const [checkedMovies, setCheckedMovies] = useState([]);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const [isFollowing, setIsFollowing] = useState("");

	const activeUser = localStorage.getItem("userId") || "";
	const token = localStorage.getItem("token");

	const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

	const fetchUser = async (userId) => {
		try {
			const response = await axios(`http://localhost:3000/users/${userId}`);

			const fetchedUser = response.data.user;

			setUser(fetchedUser);
			const isFollowing = fetchedUser.followers.includes(activeUser);
			setIsFollowing(isFollowing);
		} catch (err) {
			console.log(err);
			setError(err.message);
		}
	};

	const fetchCheckedMovies = async (userId) => {
		try {
			const response = await axios(
				`http://localhost:3000/users/${userId}/checked`
			);

			setCheckedMovies(response.data.checkedMovies);
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
	}, [userId]);

	if (error) {
		return <p>Error: {error}</p>;
	}

	if (!user) {
		return <p>Loading...</p>;
	}

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
			<div className="bg-gray-100 p-3 rounded mb-4">
				<h2 className="text-3xl font-extrabold text-gray-700">
					Checked movies:
				</h2>
				<div className="flex flex-col">
					{checkedMovies.slice(0, 3).map((movie) => {
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
			<div className="bg-gray-200 p-3 rounded-md mt-5">
				{user.comments.length === 0 ? (
					<p>No comments yet.</p>
				) : (
					user.comments.map((comment) => (
						<div key={comment._id} className="flex flex-col">
							<h2 className="text-3xl font-extrabold text-gray-700">
								Comments:
							</h2>
							<div className="flex items-center gap-3">
								<div>
									<p className="font-bold">
										{comment.movie?.title || "Deleted Movie"}
									</p>
									<img
										src={comment.movie?.posterUrl}
										alt={comment.movie?.title}
										className="w-20 h-30"
									/>
								</div>
								<p>{comment.content}</p>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default Profile;
