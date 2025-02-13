import { Link, NavLink } from "react-router-dom";

function Navbar() {
	return (
		<nav className="w-full flex justify-between p-3 bg-[green]">
			<div className="container mx-auto flex justify-between w-full">
				<span className="text-3xl brand-icon">
					<Link to="/">Flicktrack</Link>
				</span>
				<ul className="flex gap-5 items-center">
					<>
						<li>
							<NavLink to="/movies">Movies</NavLink>
						</li>
						<li>
							<NavLink to="/lists">Lists</NavLink>
						</li>
						<li>
							<NavLink to="/profile">Profile</NavLink>
						</li>
						<li>
							<NavLink to="login">Log in</NavLink>
						</li>
						<li>
							<button>Log out</button>
						</li>
					</>
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
