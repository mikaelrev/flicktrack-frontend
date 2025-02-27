function ActivityItem({ activity }) {
	return (
		<div key={activity._id}>
			{`${activity.user.username} added ${activity.targetMovie.title} to ${activity.activity}`}
		</div>
	);
}
export default ActivityItem;
