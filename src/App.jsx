import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Movies from "./pages/Movies";
import Lists from "./pages/Lists";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MovieDetails from "./pages/MovieDetails";
import Footer from "./components/Footer";
import List from "./pages/List";
import CheckedMovies from "./pages/CheckedMovies";
import FavoriteMovies from "./pages/FavoriteMovies";
import Members from "./pages/Members";

function App() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		fetch("https://flicktrack-backend.onrender.com/movies/popular")
			.then((response) => response.json())
			.then((data) => setMovies(data));
	}, []);

	return (
		<div className="flex flex-col min-h-screen justify-between bg-linear-to-b from-stone-950 to-blue-950">
			<BrowserRouter>
				<Navbar />
				<div className="container mx-auto mt-5 p-5">
					<Routes>
						<Route path="/" element={<Homepage movies={movies} />} />
						<Route path="/members" element={<Members />} />
						<Route path="/movies" element={<Movies />} />
						<Route path="/movies/:movieId" element={<MovieDetails />} />
						<Route path="/lists" element={<Lists />} />
						<Route path="/lists/:listId" element={<List />} />
						<Route path="/profile/:userId" element={<Profile />} />
						<Route
							path="/profile/:userId/checkedmovies"
							element={<CheckedMovies />}
						/>
						<Route
							path="/profile/:userId/favoritemovies"
							element={<FavoriteMovies />}
						/>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
