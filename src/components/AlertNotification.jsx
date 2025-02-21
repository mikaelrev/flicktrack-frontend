import { useEffect } from "react";

function AlertNotification({ message, onClose }) {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 3000);

		return () => clearTimeout(timer);
	}, [onClose]);

	return (
		<div className="fixed bottom-20 left-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
			<p>{message}</p>
		</div>
	);
}

export default AlertNotification;
