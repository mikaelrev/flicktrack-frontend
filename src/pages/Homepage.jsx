import { NavLink } from "react-router-dom";
import Activities from "../components/Activities";

function Homepage({ movies }) {
	const token = localStorage.getItem("token");

	return token ? (
		<div className="flex flex-col">
			<Activities />
		</div>
	) : (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-5xl font-extrabold text-white mb-5 text-center">
				Track and discover your favorite movies with FlickTrack
			</h1>
			<NavLink
				to="/signup"
				className="bg-blue-500 text-gray-100 font-bold py-2 px-6 rounded text-lg hover:bg-blue-400 mb-5"
			>
				Sign up for free
			</NavLink>
			<div className="container mt-5">
				<ul className="grid grid-cols-5 gap-4">
					{movies.slice(0, 5).map((movie) => (
						<div key={movie.id} className="max-w-[250px]">
							<img
								className={`w-full h-auto object-cover rounded-md shadow-lg mb-2`}
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								alt={movie.title || "No poster available"}
							/>
							<h3 className="text-xl font-bold tracking-tight text-gray-100">
								{movie.title}
							</h3>
						</div>
					))}
				</ul>
			</div>
		</div>
	);
}
export default Homepage;
