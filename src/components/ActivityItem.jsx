function ActivityItem({ activity }) {
	const { user, activity: type, targetMovie, targetList, comment } = activity;

	let message;
	switch (type) {
		case "checked":
		case "favorite":
			message = targetMovie
				? `${user.username} added ${targetMovie.title} to ${type}`
				: `${user.username} performed an action: ${type}`;
			break;
		case "added_to_list":
			message =
				targetMovie && targetList
					? `${user.username} added ${targetMovie.title} to the list "${targetList.name}"`
					: `${user.username} added a movie to a list`;
			break;
		case "created_list":
			message = targetList
				? `${user.username} created a new list: "${targetList.name}"`
				: `${user.username} created a new list`;
			break;
		case "commented":
			message =
				targetMovie && comment
					? `${user.username} commented on ${targetMovie.title}: "${comment.content}"`
					: comment
					? `${user.username} left a comment: "${comment.content}"`
					: `${user.username} left a comment`;
			break;
		default:
			message = `${user.username} performed an action: ${type}`;
	}

	return <div>{message}</div>;
}

export default ActivityItem;
