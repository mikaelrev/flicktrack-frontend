import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ListItem from "../components/ListItem";

function Profile() {
	const { userId } = useParams();
	const [checkedMovies, setCheckedMovies] = useState([]);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	const fetchUser = async (userId) => {
		try {
			const response = await fetch(`http://localhost:3000/users/${userId}`);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const { user } = await response.json();
			console.log(user);
			setUser(user);
		} catch (err) {
			console.log(err);
			setError(err.message);
		}
	};

	const fetchCheckedMovies = async (userId) => {
		try {
			const response = await fetch(
				`http://localhost:3000/users/${userId}/checked`
			);
			if (!response.ok) {
				throw new Error(`Failed to fetch checked movies: ${response.status}`);
			}

			const { checkedMovies } = await response.json();
			setCheckedMovies(checkedMovies);
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
			<div className="w-full flex flex-col">
				<h1 className="text-3xl font-extrabold text-gray-700 mb-4">
					{user.username}
				</h1>
				{user.profileImage === null ? (
					<img
						className="h-48 w-48 object-cover mb-3 rounded"
						src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
						alt="avatar"
					/>
				) : (
					<img
						className="h-48 w-48 object-cover mb-3 rounded"
						src={user.profileImage}
						alt={user.username}
					/>
				)}
				<p className="text-gray-700 mb-4">Bio: {user.bio}</p>
				<p className="text-gray-700 mb-4">Quote: {user.quote}</p>
				<p className="text-gray-700 mb-4">
					Checks: {user.checkedMovies.length}
				</p>
				<p className="text-gray-700 mb-4">
					Favorites: {user.favoriteMovies.length}
				</p>
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
