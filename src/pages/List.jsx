import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

function List() {
	const { listId } = useParams();
	const [list, setList] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

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
					<h1 className="text-5xl font-extrabold dark:text-white mb-5">
						Lists
					</h1>
					<p>The list is empty</p>
				</div>
			) : (
				<div>
					<h1 className="text-5xl font-extrabold dark:text-white mb-5">
						{list.name}
					</h1>
					<ul className="flex flex-col gap-3">
						{list.movies.map((movie) => (
							<div
								key={movie._id}
								className="flex items-start justify-start p-5 bg-gray-300 w-full"
							>
								<MovieCard movie={movie} size="extra-small" />
								<button
									className="p-5 bg-gray-200"
									disabled={isLoading}
									onClick={() => removeMovieFromList(movie)}
								>
									Remove from list
								</button>
							</div>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
export default List;
