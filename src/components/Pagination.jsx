function Pagination({ goToPage, page, totalPages }) {
	return (
		<div className="flex justify-center items-center gap-2 mt-6">
			<button
				onClick={() => goToPage(page - 1)}
				disabled={page === 1}
				className="px-4 py-2 bg-gray-700 text-white cursor-pointer rounded-md disabled:opacity-50"
			>
				Previous
			</button>

			{[...Array(5)].map((_, i) => {
				const pageNumber = Math.max(1, page - 2) + i;
				if (pageNumber > totalPages) return null;
				return (
					<button
						key={pageNumber}
						onClick={() => goToPage(pageNumber)}
						className={`px-4 py-2 rounded-md cursor-pointer ${
							page === pageNumber ? "bg-blue-500 text-white" : "bg-gray-300"
						}`}
					>
						{pageNumber}
					</button>
				);
			})}

			<button
				onClick={() => goToPage(page + 1)}
				disabled={page === totalPages}
				className="px-4 py-2 bg-gray-700 cursor-pointer text-white rounded-md disabled:opacity-50"
			>
				Next
			</button>
		</div>
	);
}
export default Pagination;
