import { useState } from "react";
import axios from "axios";

function AddCommentForm({ movieId, onCommentAdded }) {
	const [comment, setComment] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const token = localStorage.getItem("token");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			await axios.post(
				`http://localhost:3000/comments/${movieId}`,
				{ content: comment },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setComment("");
			onCommentAdded();
		} catch (err) {
			setError("Failed to add comment. Please try again.");
			console.error(err);
		}

		setIsLoading(false);
	};

	return (
		<div className="mt-5">
			<h2 className="text-xl font-bold mb-2">Add a Comment</h2>
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<input
					type="text"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder="Enter your comment"
					className="border p-2 rounded w-full"
					required
				/>
				<button
					type="submit"
					className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
					disabled={isLoading}
				>
					{isLoading ? "Posting..." : "Post Comment"}
				</button>
				{error && <p className="text-red-500">{error}</p>}
			</form>
		</div>
	);
}

export default AddCommentForm;
