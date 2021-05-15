import React from "react";
import {
	MoviePageContainer,
	MoviePageTitle,
} from "../../style/StyledMoviePage";
import ReviewList from "./ReviewList";

import { HomeImg } from "../../style/styledLayout";
import ratingPic from "../../style/images/rating-pic.png";

const ReviewSection = ({ user, movie }) => {
	return (
		<>
			<HomeImg
				alt="rating"
				perc={30}
				src={ratingPic}
				style={{ margin: "0 auto" }}
			/>
			<MoviePageContainer>
				<MoviePageTitle>Reviews</MoviePageTitle>
				<ReviewList user={user} movie={movie} />
			</MoviePageContainer>
		</>
	);
};

export default ReviewSection;
