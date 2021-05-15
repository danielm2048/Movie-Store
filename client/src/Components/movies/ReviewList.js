import React from "react";
import Review from "./Review";

const ReviewList = ({ user, movie }) => {
	const reviews = movie ? movie.reviews : user.reviews;
	let list = reviews.map((rev, i) => {
		return (
			<Review
				reviewId={rev.id}
				movie={!movie ? rev.movie : movie}
				user={movie ? rev.user : user}
				updatedAt={rev.updatedAt}
				text={rev.text}
				rating={rev.rating}
				belongsToCurrentUser={!movie || (user && rev.user.id === user.id)}
				displayCover={!movie}
				key={i}
			/>
		);
	});
	return <div>{list.length === 0 ? "No reviews yet..." : list}</div>;
};

export default ReviewList;
