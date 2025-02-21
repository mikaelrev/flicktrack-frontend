import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

function List() {
	const { listId } = useParams();
	const [list, setList] = useState(null);

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

	return (
		<div>
			{!list ? (
				<p>Loading...</p>
			) : list.movies.length === 0 ? (
				<p>The list is empty</p>
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
							</div>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
export default List;
