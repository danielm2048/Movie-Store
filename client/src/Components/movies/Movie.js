import React from "react";

import MovieRating from "./MovieRating";
import {
	Card,
	CardImgLink,
	CardImg,
	CardTitle,
	CardPrice,
} from "../../style/styledCard";

const Movie = ({ data }) => (
	<Card>
		<CardImgLink to={`/movie/${data.id}`}>
			<CardImg src={data.cover} alt="Movie cover" />
		</CardImgLink>
		<CardTitle>{data.name}</CardTitle>
		<MovieRating
			movieId={data.id}
			persistent={true}
			rating={Math.round(
				data.reviews.reduce((accu, curr) => accu + curr.rating, 0) /
					data.reviews.length
			)}
		/>
		<span
			style={{ textAlign: "center", fontSize: 14 }}
		>{`(Based on ${data.reviews.length} reviews)`}</span>
		<CardPrice>
			{data.availableIn[0].price}₪ -{" "}
			{data.availableIn[data.availableIn.length - 1].price}₪
		</CardPrice>
	</Card>
);

export default Movie;
