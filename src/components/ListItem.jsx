import { Link } from "react-router-dom";

function ListItem({ list }) {
	return (
		<li className="flex flex-col p-5">
			<Link to={`/lists/${list._id}`} key={list._id}>
				<div className="flex justify-between">
					<div>
						<h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							{list.name}
						</h3>
						<p>{`Movies: ${list.movies.length}`}</p>
					</div>
				</div>
			</Link>

			<div>
				{list.owner.username === undefined ? (
					""
				) : (
					<div className="flex items-center gap-3 p-2">
						<Link
							className="flex items-center gap-3"
							to={`/profile/${list.owner._id}`}
						>
							<img
								className="h-10 w-10 object-cover rounded-full"
								src={
									list.owner.profileImage ||
									"https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
								}
								alt={`${list.owner.username}'s profile picture`}
							/>
							<p className="text-blue-500">{list.owner.username}</p>
						</Link>
					</div>
				)}
			</div>
		</li>
	);
}
export default ListItem;
