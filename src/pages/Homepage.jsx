import { NavLink } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Activities from "../components/Activities";

function Homepage({ movies }) {
	const token = localStorage.getItem("token");

	return token ? (
		<div className="flex flex-col">
			<Activities />
		</div>
	) : (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-5xl font-extrabold dark:text-white mb-5 text-center">
				Track and discover your favorite movies with FlickTrack
			</h1>
			<NavLink
				to="/signup"
				className="bg-[#d9674e] text-white font-bold py-2 px-6 rounded text-lg hover:bg-[#b4563d] mb-5"
			>
				Sign up for free
			</NavLink>
			<div className="container mt-5">
				<ul className="grid grid-cols-5 gap-4">
					{movies.slice(0, 5).map((movie) => (
						<MovieCard movie={movie} key={movie.id} />
					))}
				</ul>
			</div>
		</div>
	);
}
export default Homepage;
