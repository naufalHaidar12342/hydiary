export default function Pagination({
	postPerPage,
	totalPosts,
	currentPage,
	paginate,
	previousPage,
	nextPage,
}) {
	const pageNumbers = [];
	for (let index = 1; index < Math.ceil(totalPosts / postPerPage); index++) {
		pageNumbers.push(index);
	}
	return (
		<div className="btn-group">
			<button className="btn btn-md" onClick={previousPage}>
				« Previous
			</button>
			{pageNumbers.map((number) => {
				<button
					className={
						"btn btn-md " + (number === currentPage ? "btn-active" : "")
					}
					onClick={() => paginate(number)}
				>
					{number}
				</button>;
			})}
			<button className="btn btn-md" onClick={nextPage}>
				Next »
			</button>
		</div>
	);
}
