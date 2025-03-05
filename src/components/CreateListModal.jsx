import { useState } from "react";
import Button from "./Button";

function CreateListModal({ isOpen, onClose, onListCreated }) {
	const [newListName, setNewListName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const token = localStorage.getItem("token");

	const createNewList = async () => {
		if (!newListName.trim()) return;
		setIsLoading(true);

		try {
			const response = await fetch("http://localhost:3000/users/lists", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ name: newListName }),
			});

			const data = await response.json();

			if (response.ok && data.newList) {
				onListCreated(data.newList);
				setNewListName("");
				setError("");
				onClose();
			} else {
				setError(data.message || "Error creating list");
				console.error("Error creating list:", data.message);
			}
		} catch (error) {
			setError("Network error occured");
			console.error("Network error:", error);
		}

		setIsLoading(false);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-700/80 flex items-center justify-center">
			<div className="bg-white p-5 rounded-lg w-96">
				{error ? <p className="text-red-500">{error}</p> : null}
				<h2 className="text-xl font-bold mb-4">Create a new list</h2>
				<input
					type="text"
					placeholder="Enter list name"
					className="border border-gray-500 p-2 w-full mb-3 rounded-sm"
					value={newListName}
					onChange={(e) => setNewListName(e.target.value)}
				/>
				<div className="flex justify-end gap-2">
					<Button
						bgColor="none"
						textColor="black"
						borderWidth="border"
						borderColor={"border-gray-400"}
						py={2}
						px={3}
						onClick={onClose}
					>
						Cancel
					</Button>
					<Button
						py={1}
						px={3}
						bgColor={"#2b7fff"}
						onClick={createNewList}
						disabled={isLoading}
					>
						{isLoading ? "Creating..." : "Create"}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default CreateListModal;
