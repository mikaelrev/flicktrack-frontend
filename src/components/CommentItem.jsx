import { Link } from "react-router-dom";

function CommentItem({ comment }) {
	if (!comment.user) return null;

	return (
		<Link
			to={`/profile/${comment.user._id}`}
			className="flex items-center bg-gray-200 p-5 gap-3 rounded"
		>
			<img
				src={
					comment.user.profileImage === null
						? "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
						: comment.user.profileImage
				}
				className="h-20 w-20 object-cover rounded-full"
				alt={`${comment.user.username}'s profile picture`}
			/>
			<div className="flex flex-col">
				<p className="text-sm text-gray-500">{comment.user.username}</p>
				<p>{comment.content}</p>
			</div>
		</Link>
	);
}
export default CommentItem;
