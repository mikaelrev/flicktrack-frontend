import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FavoriteMovieItem from "../components/FavoriteMovieItem";

function FavoriteMovies() {
	const [favoriteMovies, setFavoriteMovies] = useState([]);
	const { userId } = useParams();

	useEffect(() => {
		const fetchFavoriteMovies = async () => {
			try {
				const favoriteMoviesResponse = await axios.get(
					`https://flicktrack-backend.onrender.com/users/${userId}/favorites`
				);
				setFavoriteMovies(favoriteMoviesResponse.data.favoriteMovies);
				console.log(favoriteMoviesResponse.data.favoriteMovies);
			} catch (error) {
				console.log(error);
			}
		};
		fetchFavoriteMovies();
	}, [userId]);

	return (
		<div className="flex flex-col p-5 rounded">
			<h1 className="text-5xl font-extrabold text-white mb-5">
				All favorite movies:
			</h1>
			<div className="bg-gray-600 p-3 rounded">
				{favoriteMovies.map((movie) => {
					return <FavoriteMovieItem movie={movie} key={movie._id} />;
				})}
			</div>
		</div>
	);
}
export default FavoriteMovies;
