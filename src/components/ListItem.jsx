import { Link } from "react-router-dom";

function ListItem({ list }) {
	return (
		<Link to={`/lists/${list._id}`} key={list._id}>
			<li className="flex flex-col p-5 bg-gray-100 p-3 rounded">
				<h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{list.name}
				</h3>
				{list.movies.length === 0
					? ""
					: list.movies.map((movie) => (
							<div className="flex p-2 items-center gap-3" key={movie._id}>
								<img
									className="h-30 w-15 object-contain"
									src={movie.posterUrl}
								/>
								<p>{movie.title}</p>
							</div>
					  ))}
				<p>
					{list.owner.username === undefined
						? ""
						: `List created by: ${list.owner.username}`}
				</p>
			</li>
		</Link>
	);
}
export default ListItem;
