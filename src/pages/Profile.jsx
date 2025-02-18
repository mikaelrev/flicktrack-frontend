import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile() {
	const { userId } = useParams();
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

	useEffect(() => {
		fetchUser(userId);
	}, [userId]);

	if (error) {
		return <p>Error: {error}</p>;
	}

	if (!user) {
		return <p>Loading...</p>;
	}

	return (
		<div className="container mx-auto flex flex-col py-5">
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
				<h2 className="text-3xl font-extrabold text-gray-700 mb-4">
					Checked movies:
				</h2>
				{user.checkedMovies.slice(0, 3).map((movie) => (
					<div className="flex items-center gap-3" key={movie._id}>
						<img
							className="h-30 w-15 object-contain"
							src={movie.posterUrl}
							alt={`Poster for ${movie.title}`}
						/>
						<p>{movie.title}</p>
					</div>
				))}
			</div>
			<div className="bg-gray-100 p-3 rounded">
				<h2 className="text-3xl font-extrabold text-gray-700 mb-4">Lists:</h2>
				{user.lists.length === 0
					? "No lists found"
					: user.lists.map((list) => (
							<div key={list._id}>
								<h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
									{list.name}
								</h3>
								<ul>
									{list.movies.map((movie) => (
										<li className="flex items-center gap-3" key={movie._id}>
											<img
												className="h-30 w-15 object-contain"
												src={movie.posterUrl}
												alt={movie.title}
											/>
											<p>{movie.title}</p>
										</li>
									))}
								</ul>
							</div>
					  ))}
			</div>
		</div>
	);
}

export default Profile;
