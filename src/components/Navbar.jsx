import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	let userId;
	if (token) {
		const decodedToken = JSON.parse(atob(token.split(".")[1]));
		userId = decodedToken.userId;
	}

	const handleLogout = () => {
		localStorage.removeItem("token");
		userId = "";
		navigate("/");
	};

	return (
		<nav className="w-full flex justify-between p-3 bg-[green]">
			<div className="container mx-auto flex justify-between w-full">
				<span className="text-3xl brand-icon">
					<Link to="/">Flicktrack</Link>
				</span>
				<ul className="flex gap-5 items-center">
					{userId ? (
						<>
							<li>
								<NavLink to="/movies">Movies</NavLink>
							</li>
							<li>
								<NavLink to="/lists">Lists</NavLink>
							</li>
							<li>
								<NavLink to={`/profile/${userId}`}>Profile</NavLink>
							</li>
							<li>
								<button onClick={handleLogout}>Log out</button>
							</li>
						</>
					) : (
						<li>
							<NavLink to="/login">Log in</NavLink>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
