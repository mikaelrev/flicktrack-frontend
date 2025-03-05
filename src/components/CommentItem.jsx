import { Link } from "react-router-dom";
import Button from "./Button";

function CommentItem({ comment, onHandleDelete, userId }) {
	if (!comment.user) return null;

	return (
		<div className="flex items-center bg-gray-200 p-5 gap-3 rounded">
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
			<div className="flex justify-between flex-1">
				<div className="flex flex-col">
					<Link to={`/profile/${comment.user._id}`} className="text-blue-500">
						<p className="text-sm text-blue-500">{comment.user.username}</p>
					</Link>
					<p>{comment.content}</p>
				</div>
				{userId !== comment.user._id ? null : (
					<Button
						bgColor={"red"}
						textColor={"white"}
						paddingSize={1}
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
