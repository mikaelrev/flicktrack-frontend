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
				<h1 className="font-bold text-xl mb-2">{user.username}</h1>
				<img src={user.profileImage} alt={user.username} />
				<p className="text-gray-700 mb-4">Email: {user.email}</p>
				<p className="text-gray-700 mb-4">Bio: {user.bio}</p>
				<p className="text-gray-700 mb-4">Quote: {user.quote}</p>
			</div>
		</div>
	);
}

export default Profile;
