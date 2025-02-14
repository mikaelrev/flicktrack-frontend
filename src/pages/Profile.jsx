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
			<div className="w-full">
				<h1 className="font-bold text-xl mb-4">{user.username}</h1>
				{user.profileImage === null ? (
					<img
						src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
						alt="avatar"
					/>
				) : (
					<img src={user.profileImage} alt={user.username} />
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
			<div>
				<p className="text-gray-700 mb-4">
					Lists:{" "}
					{user.lists.length === 0
						? "No lists found"
						: user.lists.map((list) => <span key={list._id}>{list.name}</span>)}
				</p>
			</div>
		</div>
	);
}

export default Profile;
