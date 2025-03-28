import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Button from "../components/Button";
import AlertNotification from "../components/AlertNotification";

function List() {
	const { listId } = useParams();
	const [list, setList] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState("");
	const [error, setError] = useState("");

	const token = localStorage.getItem("token");
	const userId = localStorage.getItem("userId");

	useEffect(() => {
		const fetchList = async () => {
			try {
				const response = await axios.get(
					`https://flicktrack-backend.onrender.com/lists/${listId}`
				);
				setList(response.data.list);
			} catch (error) {
				console.error("Error fetching list:", error);
				setError(error.response?.data?.message || "Failed to fetch list.");
			}
		};

		fetchList();
	}, [listId]);

	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	const removeMovieFromList = async (movie) => {
		setIsLoading(true);
		try {
			await axios.delete(
				`https://flicktrack-backend.onrender.com/users/lists/${listId}/movies/${movie._id}`,
				config
			);

			setList((prevList) => ({
				...prevList,
				movies: prevList.movies.filter((m) => m._id !== movie._id),
			}));

			setNotificationMessage("Removed from list");
		} catch (error) {
			console.error("Error removing movie from list:", error);
			setError(
				error.response?.data?.message || "Failed to remove movie from list"
			);
		}
		setIsLoading(false);
	};

	return (
		<div>
			{!list ? (
				<p>Loading...</p>
			) : list.movies.length === 0 ? (
				<div>
					<h1 className="text-5xl font-extrabold text-white mb-5">
						{list.name}
					</h1>
					<p className="text-white">The list is empty</p>
				</div>
			) : (
				<div>
					<h1 className="text-5xl font-extrabold text-white mb-5">
						{list.name}
					</h1>
					<ul className="flex flex-col gap-3">
						{error ? <p className="text-red-600">{error}</p> : null}
						{list.movies.map((movie) => (
							<div
								key={movie._id}
								className="flex flex-col md:flex-row gap-2 md:gap-0 md:items-center justify-between p-5 bg-gray-600 w-full rounded"
							>
								<MovieCard movie={movie} size="extra-small" />
								{userId === list.owner._id ? (
									<Button
										bgColor={`bg-gray-500`}
										isLoading={isLoading}
										onClick={() => removeMovieFromList(movie)}
									>
										Remove from list
									</Button>
								) : null}
							</div>
						))}
					</ul>
				</div>
			)}
			{notificationMessage && (
				<AlertNotification
					message={notificationMessage}
					onClose={() => setNotificationMessage("")}
				/>
			)}
		</div>
	);
}
export default List;
