import { useEffect, useState } from "react";

function Lists() {
	const [lists, setLists] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3000/lists")
			.then((response) => response.json())
			.then((data) => setLists(data.lists));
	}, []);

	console.log(lists);

	return (
		<div className="flex flex-col">
			<ul className="flex flex-col gap-2 justify-center items-center">
				{lists.length === 0
					? "No lists found"
					: lists.map((list) => (
							<li key={list._id}>
								<p>{list.name}</p>
								{list.movies.length === 0
									? ""
									: list.movies.map((movie) => (
											<div className="flex items-center gap-3" key={movie._id}>
												<img
													className="h-30 w-15 object-contain"
													src={movie.posterUrl}
												/>
												<p>{movie.title}</p>
											</div>
									  ))}
							</li>
					  ))}
			</ul>
		</div>
	);
}
export default Lists;
