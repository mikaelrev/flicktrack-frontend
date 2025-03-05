import { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";

function AddToListForm({
	isOpen,
	onClose,
	config,
	movieId,
	userId,
	setNotificationMessage,
}) {
	const [userLists, setUserLists] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [selectedListId, setSelectedListId] = useState("");

	const fetchUserLists = useCallback(async () => {
		setIsLoading(true);

		try {
			const response = await axios.get(
				`http://localhost:3000/users/${userId}/lists`
			);

			setUserLists(response.data.lists);

			if (response.data.lists.length > 0) {
				setSelectedListId(response.data.lists[0]._id);
			}
		} catch (error) {
			setError("Network error occured");
			console.error("Network error:", error);
		}

		setIsLoading(false);
	}, [userId]);

	useEffect(() => {
		fetchUserLists();
	}, [fetchUserLists]);

	const addToList = async () => {
		if (!selectedListId) {
			setError("Please select a list to add the movie.");
			return;
		}

		setIsLoading(true);

		try {
			await axios.post(
				`http://localhost:3000/users/lists/${selectedListId}/movies/${movieId}`,
				{},
				config
			);

			setError("");
			setNotificationMessage(`Movie added to list`);
			onClose();
		} catch (error) {
			setError("Network error occured");
			console.error("Network error:", error);
		}

		setIsLoading(false);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-700/80 flex items-center justify-center">
			<div className="flex flex-col gap-5 bg-white p-5 rounded-lg w-96">
				{userLists.length === 0 && <p>{`You haven't created any lists`}</p>}
				{error ? <p className="text-red-500">{error}</p> : null}
				<label htmlFor="lists" className="text-xl font-bold">
					Add movie to a list
				</label>

				<select
					id="lists"
					value={selectedListId}
					onChange={(e) => {
						setSelectedListId(e.target.value);
					}}
					className="mb-3 border-1 border-gray-300 rounded p-2"
				>
					{userLists.map((list) => (
						<option key={list._id} value={list._id}>
							{list.name}
						</option>
					))}
				</select>
				<div className="flex justify-end gap-2">
					<Button
						onClick={onClose}
						bgColor="none"
						textColor="black"
						borderWidth="border-1"
						borderColor={"border-gray-400"}
						radius="rounded"
						py={2}
						px={3}
					>
						Cancel
					</Button>
					<Button
						onClick={addToList}
						radius="rounded"
						textColor="white"
						isLoading={isLoading}
						py={2}
						px={3}
					>
						{isLoading ? "Adding..." : "Add"}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default AddToListForm;
