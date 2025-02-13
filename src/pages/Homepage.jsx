import { NavLink } from "react-router-dom";
import MovieCard from "../components/MovieCard";

function Homepage({ movies }) {
	return (
		<div className="flex flex-col items-center justify-center">
			<h1>Track and discover your favorite movies with FlickTrack</h1>
			<NavLink
				to="/signup"
				className="bg-[#d9674e] text-white font-bold py-2 px-6 rounded text-lg hover:bg-[#b4563d]"
			>
				Sign up for free
			</NavLink>
			<div className="container">
				<ul className="grid grid-cols-6 gap-4">
					{movies.map((movie) => (
						<MovieCard movie={movie} key={movie.id} />
					))}
				</ul>
			</div>
		</div>
	);
}
export default Homepage;
