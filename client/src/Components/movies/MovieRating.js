import React from "react";

import { ReviewStars } from "../../style/styledCard";

const MovieRating = ({
	id,
	movieId,
	persistent,
	rating,
	margin,
	setRating,
}) => {
	const stars = [];
	for (let i = 5; i >= 1; i--) {
		const key = id ? id + i : movieId + i;
		stars.push(
			<React.Fragment key={key}>
				<input
					type="radio"
					id={key}
					name={id + movieId}
					value={i}
					checked={i === rating}
					onChange={setRating}
					disabled={persistent}
				/>
				<label htmlFor={key}></label>
			</React.Fragment>
		);
	}
	return (
		<ReviewStars persistent={persistent} margin={margin}>
			{stars}
		</ReviewStars>
	);
};

export default MovieRating;
