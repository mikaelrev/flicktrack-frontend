import { Link } from "react-router-dom";

function ActivityLink({ to, children }) {
	return (
		<Link to={to} className="text-blue-500 hover:text-blue-700">
			{children}
		</Link>
	);
}

export default ActivityLink;
