function UserInfo({ user }) {
	return (
		<div className="w-full flex flex-col">
			<h1 className="text-3xl font-extrabold text-white mb-4">
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
			<div className="flex flex-col gap-3 text-gray-100">
				<p>
					Bio: <span className="text-gray-300">{user.bio}</span>
				</p>
				<p>
					Quote: <span className="text-gray-300">{user.quote}</span>
				</p>
				<p>
					Checks:{" "}
					<span className="text-gray-300">{user.checkedMovies.length}</span>
				</p>
				<p>
					Favorites:{" "}
					<span className="text-gray-300">{user.favoriteMovies.length}</span>
				</p>
				<p>
					Followers:{" "}
					<span className="text-gray-300">{user.followers.length}</span>
				</p>
				<p>
					Following:{" "}
					<span className="text-gray-300">{user.following.length}</span>
				</p>
			</div>
		</div>
	);
}
export default UserInfo;
