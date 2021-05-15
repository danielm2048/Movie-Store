import React from "react";
import MovieRating from "./MovieRating";
import ReviewSideImage from "./ReviewSideImage";
import ReviewMoreActions from "./ReviewMoreActions";

const Review = ({
	reviewId,
	movie,
	user,
	updatedAt,
	text,
	rating,
	belongsToCurrentUser,
	displayCover,
}) => {
	return (
		<div
			style={{ position: "relative", display: "flex", marginBottom: "35px" }}
		>
			{belongsToCurrentUser && (
				<ReviewMoreActions reviewId={reviewId} movie={movie} />
			)}
			<ReviewSideImage movie={movie} displayCover={displayCover} />
			<div style={{ display: "flex", flexDirection: "column" }}>
				<span
					style={{
						padding: "10px",
						fontWeight: 700,
						whiteSpace: "pre-wrap",
					}}
				>
					{`${user.username}\n${updatedAt}`}
				</span>
				<MovieRating id={reviewId} persistent rating={rating} margin="0" />
				<div style={{ padding: "0 10px", fontSize: 16 }}>
					<p>{text}</p>
				</div>
			</div>
		</div>
	);
};

export default Review;
