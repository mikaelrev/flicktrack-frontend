import axios from "axios";
import { useEffect, useState } from "react";
import ActivityItem from "./ActivityItem";

function Activities() {
	const [activities, setActivities] = useState([]);

	useEffect(() => {
		const fetchActivities = async () => {
			try {
				const activitiesResponse = await axios.get(
					"http://localhost:3000/activities"
				);
				const sortedActivities = activitiesResponse.data.activities.reverse();
				setActivities(sortedActivities);
			} catch (error) {
				console.log(error);
			}
		};
		fetchActivities();
	}, []);

	console.log(activities);

	return (
		<div className="flex flex-col gap-3">
			<h1 className="text-5xl font-extrabold dark:text-white mb-5">Home</h1>
			{activities.map((activity) => {
				return (
					<div key={activity._id} className="bg-gray-600 p-3 rounded">
						<ActivityItem activity={activity} />
					</div>
				);
			})}
		</div>
	);
}

export default Activities;
