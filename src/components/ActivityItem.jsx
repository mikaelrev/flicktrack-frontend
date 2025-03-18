import ActivityLink from "./ActivityLink";

function ActivityItem({ activity }) {
	const { user, activity: type, targetMovie, targetList, comment } = activity;

	let message;
	switch (type) {
		case "checked":
		case "favorite":
			message = targetMovie ? (
				<div className="flex gap-2 text-gray-300">
					<ActivityLink to={`/profile/${user._id}`}>
						{user.username}
					</ActivityLink>{" "}
					added{" "}
					<ActivityLink to={`/movies/${targetMovie.tmdbId}`}>
						{targetMovie.title}
					</ActivityLink>{" "}
					to{" "}
					<ActivityLink to={`/profile/${user._id}/${type}movies`}>
						{type}
					</ActivityLink>
				</div>
			) : (
				<>
					<ActivityLink to={`/profile/${user._id}`}>
						{user.username}
					</ActivityLink>{" "}
					performed an action: <strong>{type}</strong>
				</>
			);
			break;
		case "added_to_list":
			message =
				targetMovie && targetList ? (
					<div className="flex gap-2 text-gray-300">
						<ActivityLink to={`/profile/${user._id}`}>
							{user.username}
						</ActivityLink>{" "}
						added{" "}
						<ActivityLink to={`/movies/${targetMovie.tmdbId}`}>
							{targetMovie.title}
						</ActivityLink>{" "}
						to the list{" "}
						<ActivityLink to={`/lists/${targetList._id}`}>
							{targetList.name}
						</ActivityLink>
					</div>
				) : (
					<div className="flex gap-2 text-gray-300">
						<ActivityLink to={`/profile/${user._id}`}>
							{user.username}
						</ActivityLink>{" "}
						added a movie to a list
					</div>
				);
			break;
		case "created_list":
			message = targetList ? (
				<div className="flex gap-2 text-gray-300">
					<ActivityLink to={`/profile/${user._id}`}>
						{user.username}
					</ActivityLink>{" "}
					created a new list:{" "}
					<ActivityLink to={`/lists/${targetList._id}`}>
						{targetList.name}
					</ActivityLink>
				</div>
			) : (
				<div className="flex gap-2 text-gray-300">
					<ActivityLink to={`/profile/${user._id}`}>
						{user.username}
					</ActivityLink>{" "}
					created a new list
				</div>
			);
			break;
		case "commented":
			message =
				targetMovie && comment ? (
					<div className="flex flex-col text-white">
						<div className="flex gap-2 flex-1 mb-2">
							<ActivityLink to={`/profile/${user._id}`}>
								{user.username}
							</ActivityLink>{" "}
							<p className="text-gray-300">commented on:</p>
							<ActivityLink to={`/movies/${targetMovie.tmdbId}`}>
								{targetMovie.title}
							</ActivityLink>
						</div>
						<q className="p-3 bg-gray-500 rounded">{comment.content}</q>
					</div>
				) : comment ? (
					<div className="flex">
						<ActivityLink to={`/profile/${user._id}`}>
							{user.username}
						</ActivityLink>{" "}
						left a comment: <q>{comment.content}</q>
					</div>
				) : (
					<div className="flex gap-2 text-gray-300">
						<ActivityLink to={`/profile/${user._id}`}>
							{user.username}
						</ActivityLink>{" "}
						left a comment
					</div>
				);
			break;
		default:
			message = (
				<>
					<ActivityLink to={`/profile/${user._id}`}>
						{user.username}
					</ActivityLink>{" "}
					performed an action: <strong>{type}</strong>
				</>
			);
	}

	return <div>{message}</div>;
}

export default ActivityItem;
