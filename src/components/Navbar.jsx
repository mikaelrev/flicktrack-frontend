import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	let userId;
	if (token) {
		const decodedToken = JSON.parse(atob(token.split(".")[1]));
		userId = decodedToken.userId;
	}

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userId");
		userId = "";
		navigate("/");
	};

	return (
		<nav className="container mx-auto w-full p-3 text-white relative flex justify-between items-center">
			<span className="text-3xl brand-icon font-roboto font-extrabold hover:text-gray-300 z-10 inline-block">
				<Link to="/">Flicktrack</Link>
			</span>

			<div className="md:hidden flex items-center justify-end z-20">
				<button onClick={() => setIsOpen(!isOpen)} className="text-white">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className="h-6 w-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>

			<ul
				className={`md:flex md:flex-row flex-col gap-5 items-center bg-blue-950 md:bg-transparent p-5 md:p-0 transition-all duration-300 absolute md:static top-0 left-0 md:top-0 md:left-0 md:w-auto w-full ${
					isOpen ? "block" : "hidden"
				} `}
				style={{
					top: "3.5rem",
				}}
			>
				{userId ? (
					<>
						<li>
							<NavLink
								to="/movies?page=1"
								className="font-roboto text-xl hover:text-gray-300"
								onClick={() => setIsOpen(false)}
							>
								Movies
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/members"
								className="font-roboto text-xl hover:text-gray-300"
								onClick={() => setIsOpen(false)}
							>
								Members
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/lists"
								className="font-roboto text-xl hover:text-gray-300"
								onClick={() => setIsOpen(false)}
							>
								Lists
							</NavLink>
						</li>
						<li>
							<NavLink
								to={`/profile/${userId}`}
								className="font-roboto text-xl hover:text-gray-300"
								onClick={() => setIsOpen(false)}
							>
								Profile
							</NavLink>
						</li>
						<li>
							<button
								onClick={() => {
									handleLogout();
									setIsOpen(false);
								}}
								className="cursor-pointer font-roboto text-xl hover:text-gray-300"
							>
								Log out
							</button>
						</li>
					</>
				) : (
					<li>
						<NavLink
							to="/login"
							className="cursor-pointer font-roboto text-xl hover:text-gray-300"
							onClick={() => setIsOpen(false)}
						>
							Log in
						</NavLink>
					</li>
				)}
			</ul>
		</nav>
	);
}

export default Navbar;
