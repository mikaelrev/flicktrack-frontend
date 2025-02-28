import { Link } from "react-router-dom";

function MemberItem({ member }) {
	return (
		<div>
			{member.username === undefined ? (
				""
			) : (
				<div className="flex items-center gap-3 p-2">
					<Link
						className="flex items-center gap-3"
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
						<p className="text-blue-500">{member.username}</p>
					</Link>
				</div>
			)}
		</div>
	);
}
export default MemberItem;
