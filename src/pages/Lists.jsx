import { useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import CreateListModal from "../components/CreateListModal";
import axios from "axios";
import Button from "../components/Button";

function Lists() {
	const [lists, setLists] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const token = localStorage.getItem("token");

	const fetchLists = async () => {
		try {
			const response = await fetch("http://localhost:3000/lists");
			const data = await response.json();
			setLists(data.lists);
		} catch (error) {
			console.error("Error fetching lists:", error);
		}
	};

	useEffect(() => {
		fetchLists();
	}, []);

	const handleListCreated = (newList) => {
		setLists((prevLists) => [...prevLists, newList]);
		fetchLists();
	};

	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	const handleDeleteList = async (listId) => {
		if (!token) {
			setError("You must be logged in to delete a list.");
			return;
		}

		setIsLoading(true);
		try {
			await axios.delete(`http://localhost:3000/users/lists/${listId}`, config);

			setLists((prevLists) => prevLists.filter((list) => list._id !== listId));
		} catch (error) {
			if (error.response && error.response.status === 401) {
				setError("Your session has expired. Please log in again");
			} else {
				setError(error.response?.data?.message || "Error removing list.");
			}
			console.error("Error removing list:", error);
		}
		setIsLoading(false);
	};

	return (
		<div>
			<h1 className="text-5xl font-extrabold text-white mb-5">Lists</h1>
			<Button
				py={2}
				px={3}
				bgColor={"#2b7fff"}
				onClick={() => setIsModalOpen(true)}
			>
				Create new list
			</Button>

			<ul className="flex flex-col gap-3 mt-5">
				{error ? <p>{error}</p> : null}
				{isLoading ? <p>Loading...</p> : null}
				{!lists || lists.length === 0
					? "No lists found"
					: lists.map((list) =>
							list ? (
								<div
									className="flex items-center justify-between bg-gray-600 rounded p-5"
									key={list._id}
								>
									<ListItem list={list} />
									<div className="flex-shrink-0">
										<Button
											bgColor={"#d11a2a"}
											py={2}
											px={3}
											onClick={() => handleDeleteList(list._id)}
										>
											Delete list
										</Button>
									</div>
								</div>
							) : null
					  )}
			</ul>

			<CreateListModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onListCreated={handleListCreated}
			/>
		</div>
	);
}
export default Lists;
