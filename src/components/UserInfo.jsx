function UserInfo({ user }) {
	return (
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
			<p className="text-gray-700 mb-4">Checks: {user.checkedMovies.length}</p>
			<p className="text-gray-700 mb-4">
				Favorites: {user.favoriteMovies.length}
			</p>
			<p className="text-gray-700 mb-4">Followers: {user.followers.length}</p>
			<p className="text-gray-700 mb-4">Following: {user.following.length}</p>
		</div>
	);
}
export default UserInfo;
