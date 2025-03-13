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

	const token = localStorage.getItem("token");

	useEffect(() => {
		const fetchList = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3000/lists/${listId}`
				);
				setList(response.data.list);
			} catch (error) {
				console.error("Error fetching list:", error);
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
				`http://localhost:3000/users/lists/${listId}/movies/${movie._id}`,
				config
			);

			setList((prevList) => ({
				...prevList,
				movies: prevList.movies.filter((m) => m._id !== movie._id),
			}));

			setNotificationMessage("Removed from list");
		} catch (error) {
			console.error("Error removing movie from list:", error);
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
						{list.movies.map((movie) => (
							<div
								key={movie._id}
								className="flex items-center justify-between p-5 bg-gray-600 w-full rounded"
							>
								<MovieCard movie={movie} size="extra-small" />
								<Button
									bgColor={`bg-gray-500`}
									py={2}
									px={3}
									isLoading={isLoading}
									onClick={() => removeMovieFromList(movie)}
								>
									Remove from list
								</Button>
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
