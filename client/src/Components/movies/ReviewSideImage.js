import React from "react";
import { Link } from "react-router-dom";
import { UserCircle } from "@styled-icons/heroicons-outline";

const ReviewSideImage = ({ movie, displayCover }) => {
	return displayCover ? (
		<Link to={`/movie/${movie.id}`}>
			<img
				src={movie.cover}
				alt="movie cover"
				style={{ width: 150, height: 200, borderRadius: 10 }}
			/>
		</Link>
	) : (
		<UserCircle size="36" />
	);
};

export default ReviewSideImage;
