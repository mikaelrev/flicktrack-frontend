import { Link } from "react-router-dom";

function MemberItem({ member }) {
	return (
		<div>
			{member.username === undefined ? (
				""
			) : (
				<div className="flex flex-col gap-3 bg-gray-600 p-5 rounded">
					<Link
						className="flex gap-3 items-center"
						to={`/profile/${member._id}`}
					>
						<img
							className="h-10 w-10 object-cover rounded-full"
							src={
								member.profileImage ||
								"https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
							}
							alt={`${member.username}'s profile picture`}
						/>
						<div className="flex flex-col">
							<p className="text-white">{member.username}</p>
						</div>
					</Link>
					<div className="md:flex justify-between text-gray-300 rounded gap-3">
						<p>Checked movies: {member.checkedMovies.length}</p>
						<p>Favorite movies: {member.favoriteMovies.length}</p>
						<p>Lists: {member.lists.length}</p>
						<p>Following: {member.following.length}</p>
						<p>Followers: {member.followers.length}</p>
					</div>
				</div>
			)}
		</div>
	);
}
export default MemberItem;
