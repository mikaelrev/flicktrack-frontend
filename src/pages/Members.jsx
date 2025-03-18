import axios from "axios";
import { useEffect, useState } from "react";
import MemberItem from "../components/MemberItem";

function Members() {
	const [members, setMembers] = useState([]);

	useEffect(() => {
		const fetchAllMembers = async () => {
			try {
				const response = await axios.get(
					"https://flicktrack-backend.onrender.com/users"
				);
				setMembers(response.data.users);
			} catch (error) {
				console.log(error);
			}
		};
		fetchAllMembers();
	}, []);

	return (
		<div className="flex flex-col gap-3">
			<h1 className="text-5xl font-extrabold text-white mb-5">Members:</h1>
			{!members || members.length === 0
				? "No members found"
				: members.map((member) =>
						member ? <MemberItem key={member._id} member={member} /> : null
				  )}
		</div>
	);
}
export default Members;
