import axios from "axios";
import { useEffect, useState } from "react";
import ActivityItem from "./ActivityItem";
import Button from "./Button";

function Activities() {
	const [activities, setActivities] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const fetchActivities = async (currentPage) => {
		setIsLoading(true);
		try {
			const response = await axios.get(
				`http://localhost:3000/activities?page=${currentPage}&limit=10`
			);
			if (currentPage === 1) {
				setActivities(response.data.activities);
			} else {
				setActivities((prev) => [...prev, ...response.data.activities]);
			}
			setTotalPages(response.data.totalPages);
		} catch (error) {
			console.error("Error fetching activities:", error);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		fetchActivities(page);
	}, [page]);

	console.log(activities);

	return (
		<div className="flex flex-col gap-3">
			<h1 className="text-5xl font-extrabold text-white mb-5">Home</h1>
			{activities.map((activity) => (
				<div key={activity._id} className="bg-gray-600 p-3 rounded">
					<ActivityItem activity={activity} />
				</div>
			))}
			{page < totalPages && (
				<div className="flex justify-center">
					<Button
						onClick={() => setPage((prev) => prev + 1)}
						className="mt-3"
						bgColor={`bg-blue-500`}
						hover={`hover:bg-blue-400`}
						disabled={isLoading}
					>
						{isLoading ? "Loading..." : "Show More"}
					</Button>
				</div>
			)}
		</div>
	);
}

export default Activities;
