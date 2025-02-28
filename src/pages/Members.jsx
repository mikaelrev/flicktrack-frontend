import axios from "axios";
import { useEffect, useState } from "react";
import MemberItem from "../components/MemberItem";

function Members() {
	const [members, setMembers] = useState([]);

	useEffect(() => {
		const fetchAllMembers = async () => {
			try {
				const response = await axios.get("http://localhost:3000/users");
				setMembers(response.data.users);
			} catch (error) {
				console.log(error);
			}
		};
		fetchAllMembers();
	}, []);

	console.log(
		members.map((member) => {
			console.log(member.username);
		})
	);

	return (
		<div className="flex flex-col items-start justify-start">
			<h1 className="text-5xl font-extrabold dark:text-white mb-5">Members:</h1>
			{!members || members.length === 0
				? "No members found"
				: members.map((member) =>
						member ? <MemberItem key={member._id} member={member} /> : null
				  )}
		</div>
	);
}
export default Members;
