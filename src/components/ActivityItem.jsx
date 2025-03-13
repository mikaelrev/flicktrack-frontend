import ActivityLink from "./ActivityLink";

function ActivityItem({ activity }) {
	const { user, activity: type, targetMovie, targetList, comment } = activity;

	let message;
	switch (type) {
		case "checked":
		case "favorite":
			message = targetMovie ? (
				<>
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
				</>
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
					<>
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
					</>
				) : (
					<>
						<ActivityLink to={`/profile/${user._id}`}>
							{user.username}
						</ActivityLink>{" "}
						added a movie to a list
					</>
				);
			break;
		case "created_list":
			message = targetList ? (
				<>
					<ActivityLink to={`/profile/${user._id}`}>
						{user.username}
					</ActivityLink>{" "}
					created a new list:{" "}
					<ActivityLink to={`/lists/${targetList._id}`}>
						{targetList.name}
					</ActivityLink>
				</>
			) : (
				<>
					<ActivityLink to={`/profile/${user._id}`}>
						{user.username}
					</ActivityLink>{" "}
					created a new list
				</>
			);
			break;
		case "commented":
			message =
				targetMovie && comment ? (
					<div className="flex flex-col">
						<div className="flex-1 mb-2">
							<ActivityLink to={`/profile/${user._id}`}>
								{user.username}
							</ActivityLink>{" "}
							commented on{" "}
							<ActivityLink to={`/movies/${targetMovie._id}`}>
								{targetMovie.title}
							</ActivityLink>
							:
						</div>
						<q className="p-3 bg-gray-300">{comment.content}</q>
					</div>
				) : comment ? (
					<>
						<ActivityLink to={`/profile/${user._id}`}>
							{user.username}
						</ActivityLink>{" "}
						left a comment: <q>{comment.content}</q>
					</>
				) : (
					<>
						<ActivityLink to={`/profile/${user._id}`}>
							{user.username}
						</ActivityLink>{" "}
						left a comment
					</>
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
