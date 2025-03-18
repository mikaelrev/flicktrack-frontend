import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const response = await fetch("http://localhost:3000/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				throw new Error("Login failed");
			}

			const data = await response.json();
			localStorage.setItem("token", data.token);
			localStorage.setItem("userId", data.user.id);

			navigate("/");
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="bg-gray-600 text-gray-100 p-8 rounded-lg shadow-md w-96">
				<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
				<form
					onSubmit={handleLogin}
					className="flex flex-col gap-5 text-gray-100"
				>
					<div>
						<label>Email:</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
						/>
					</div>
					<div>
						<label>Password:</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
						/>
					</div>
					<Button
						type="submit"
						isLoading={loading}
						bgColor={`bg-blue-600`}
						hover={`hover:bg-blue-500`}
					>
						{loading ? "Logging in..." : "Login"}
					</Button>
					{error && <p className="mt-2 text-red-500">{error}</p>}
				</form>
				<p className="mt-4 text-center text-gray-300">
					Not a user?{" "}
					<a
						href="/signup"
						onClick={(e) => {
							e.preventDefault();
							navigate("/signup");
						}}
						className="text-white hover:underline"
					>
						Sign up now
					</a>
				</p>
			</div>
		</div>
	);
};

export default Login;
