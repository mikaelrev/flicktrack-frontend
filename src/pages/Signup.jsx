import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [profileImage, setProfileImage] = useState("");
	const [bio, setBio] = useState("");
	const [quote, setQuote] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSignUp = async (e) => {
		e.preventDefault();
		setError("");
		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		setLoading(true);
		try {
			const response = await fetch("http://localhost:3000/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username,
					email,
					password,
					profileImage: profileImage || undefined,
					bio: bio || undefined,
					quote: quote || undefined,
				}),
			});
			const data = await response.json();
			if (!response.ok) throw new Error(data.message || "Signup failed");

			navigate("/movies");
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="bg-gray-600 text-white p-8 rounded-lg shadow-md w-96">
				<h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
				<form
					onSubmit={handleSignUp}
					className="flex flex-col gap-5 text-gray-100"
				>
					<div>
						<label>Username:</label>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
						/>
					</div>
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
					<div>
						<label>Confirm Password:</label>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
						/>
					</div>
					<div>
						<label>Profile Image URL (optional):</label>
						<input
							type="text"
							value={profileImage}
							onChange={(e) => setProfileImage(e.target.value)}
							className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
						/>
					</div>
					<div>
						<label>Bio (optional):</label>
						<textarea
							value={bio}
							onChange={(e) => setBio(e.target.value)}
							className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
						></textarea>
					</div>
					<div>
						<label>Favorite Quote (optional):</label>
						<input
							type="text"
							value={quote}
							onChange={(e) => setQuote(e.target.value)}
							className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
						/>
					</div>
					<Button
						type="submit"
						isLoading={loading}
						bgColor={`bg-blue-600`}
						hover={`hover:bg-blue-500`}
						py={2}
						px={3}
					>
						{loading ? "Signing up..." : "Sign Up"}
					</Button>
					{error && <p className="mt-2 text-red-500">{error}</p>}
				</form>
				<p className="mt-4 text-center text-gray-300">
					Already a user?{" "}
					<a
						href="/login"
						onClick={(e) => {
							e.preventDefault();
							navigate("/login");
						}}
						className="text-white hover:underline"
					>
						Login now
					</a>
				</p>
			</div>
		</div>
	);
};

export default Signup;
