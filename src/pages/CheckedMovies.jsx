import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckedMovieItem from "../components/CheckedMovieItem";

function CheckedMovies() {
	const [checkedMovies, setCheckedMovies] = useState([]);
	const { userId } = useParams();

	useEffect(() => {
		const fetchCheckedMovies = async () => {
			try {
				const checkedMoviesResponse = await axios.get(
					`https://flicktrack-backend.onrender.com/users/${userId}/checked`
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
		<div className="flex flex-col p-5 rounded">
			<h1 className="text-5xl font-extrabold text-white mb-5">
				All checked movies:
			</h1>
			<div className="bg-gray-600 p-3 rounded">
				{checkedMovies.map((movie) => {
					return <CheckedMovieItem movie={movie} key={movie._id} />;
				})}
			</div>
		</div>
	);
}
export default CheckedMovies;
