import { Link } from "react-router-dom";
import Button from "./Button";

function CommentItem({ comment, onHandleDelete, userId }) {
	if (!comment.user) return null;

	return (
		<div className="flex flex-col md:flex-row md:items-center bg-gray-600 text-gray-300 p-5 gap-3 rounded">
			<Link to={`/profile/${comment.user._id}`}>
				<img
					src={
						comment.user.profileImage === null
							? "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
							: comment.user.profileImage
					}
					className="h-20 w-20 object-cover rounded-full"
					alt={`${comment.user.username}'s profile picture`}
				/>
			</Link>
			<div className="flex flex-col gap-2 md:gap-0 md:flex-row justify-between flex-1">
				<div className="flex flex-col">
					<Link
						to={`/profile/${comment.user._id}`}
						className="text-white hover:text-gray-300"
					>
						{comment.user.username}
					</Link>
					<p>{comment.content}</p>
				</div>
				{userId !== comment.user._id ? null : (
					<Button
						bgColor={`bg-gray-500`}
						textColor={`text-gray-100`}
						py={2}
						px={3}
						onClick={() => onHandleDelete(comment._id)}
					>
						Delete comment
					</Button>
				)}
			</div>
		</div>
	);
}
export default CommentItem;
