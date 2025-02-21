import { useEffect, useState } from "react";
import ListItem from "../components/ListItem";

function Lists() {
	const [lists, setLists] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3000/lists")
			.then((response) => response.json())
			.then((data) => setLists(data.lists));
	}, []);

	console.log(lists);

	return (
		<div>
			<h1 className="text-5xl font-extrabold dark:text-white mb-5">Lists</h1>
			<ul className="flex flex-col gap-3">
				{lists.length === 0
					? "No lists found"
					: lists.map((list) => <ListItem list={list} key={list._id} />)}
			</ul>
		</div>
	);
}
export default Lists;
