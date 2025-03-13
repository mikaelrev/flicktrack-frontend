import { Link } from "react-router-dom";

function ActivityLink({ to, children }) {
	return (
		<Link to={to} className="text-white hover:text-gray-300 flex">
			{children}
		</Link>
	);
}

export default ActivityLink;
