import React from "react";
import { StyledPagination } from "../../style/styledLayout";

const Pagination = ({ totalMovies, moviesPerPage, paginate, curr }) => {
	const pageNumbers = [];

	const maxPages = Math.ceil(totalMovies / moviesPerPage);

	for (let i = 1; i <= maxPages; i++) {
		pageNumbers.push(i);
	}

	return (
		<div
			style={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}
		>
			<StyledPagination onClick={() => (curr > 1 ? paginate(--curr) : null)}>
				&laquo;
			</StyledPagination>
			{pageNumbers.map((p) => (
				<StyledPagination
					key={p}
					active={curr === p ? "true" : "false"}
					onClick={() => paginate(p)}
				>
					{p}
				</StyledPagination>
			))}
			<StyledPagination
				onClick={() => (curr < maxPages ? paginate(++curr) : null)}
			>
				&raquo;
			</StyledPagination>
		</div>
	);
};

export default Pagination;
