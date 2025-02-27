import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CheckedMovies() {
	const [checkedMovies, setCheckedMovies] = useState([]);
	const { userId } = useParams();

	useEffect(() => {
		const fetchCheckedMovies = async () => {
			try {
				const checkedMoviesResponse = await axios.get(
					`http://localhost:3000/users/${userId}/checked`
				);
				setCheckedMovies(checkedMoviesResponse.data.checkedMovies);
				console.log(checkedMoviesResponse.data.checkedMovies);
			} catch (error) {
				console.log(error);
			}
		};
		fetchCheckedMovies();
	}, [userId]);

	return (
		<div className="flex flex-col bg-gray-100 p-5 rounded">
			<h1 className="text-5xl font-extrabold dark:text-white mb-5">
				All checked movies:
			</h1>
			{checkedMovies.map((movie) => {
				return (
					<Link
						to={`/movies/${movie.tmdbId}`}
						key={movie._id}
						className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded transition"
					>
						<img
							className="h-30 w-15 object-contain"
							src={movie.posterUrl}
							alt={`Poster for ${movie.title}`}
						/>
						<p className="font-semibold">{movie.title}</p>
					</Link>
				);
			})}
		</div>
	);
}
export default CheckedMovies;
