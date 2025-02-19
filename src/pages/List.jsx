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

	console.log(list);

	return (
		<div className="container mt-5 p-5">
			{!list ? (
				<p>Loading...</p>
			) : list.movies.length === 0 ? (
				<p>The list is empty</p>
			) : (
				<>
					<h1 className="text-5xl font-extrabold dark:text-white mb-5">
						{list.name}
					</h1>
					<ul className="grid grid-cols-6 gap-4">
						{list.movies.map((movie) => (
							<MovieCard movie={movie} key={movie._id} />
						))}
					</ul>
				</>
			)}
		</div>
	);
}
export default List;
