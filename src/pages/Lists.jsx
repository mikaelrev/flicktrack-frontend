import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Lists() {
	const [lists, setLists] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3000/lists")
			.then((response) => response.json())
			.then((data) => setLists(data.lists));
	}, []);

	console.log(lists);

	return (
		<div className="md:container md:mx-auto mt-5">
			<h1 className="text-5xl font-extrabold dark:text-white mb-5">Lists</h1>
			<ul className="flex flex-col gap-3">
				{lists.length === 0
					? "No lists found"
					: lists.map((list) => (
							<Link to={`/lists/${list._id}`} key={list._id}>
								<li className="flex flex-col p-5 bg-gray-100 p-3 rounded">
									<h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
										{list.name}
									</h3>
									{list.movies.length === 0
										? ""
										: list.movies.map((movie) => (
												<div
													className="flex p-2 items-center gap-3"
													key={movie._id}
												>
													<img
														className="h-30 w-15 object-contain"
														src={movie.posterUrl}
													/>
													<p>{movie.title}</p>
												</div>
										  ))}
									<p>List created by: {list.owner.username}</p>
								</li>
							</Link>
					  ))}
			</ul>
		</div>
	);
}
export default Lists;
