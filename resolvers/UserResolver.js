const mongoose = require("mongoose");
const Movie = require("../models/movies.model");
const Wishlist = require("../models/wishlist.model");
const Review = require("../models/reviews.model");

const getWished = async (parent) => {
	const list = await Wishlist.find({ userId: parent.id, active: true });
	let dates = {};
	const movies = await Movie.find({
		_id: {
			$in: list.map((item) => {
				dates[item.movieId] = item.updatedAt;
				return mongoose.Types.ObjectId(item.movieId);
			}),
		},
	});

	return movies.map((item) => {
		return {
			movie: item,
			updatedAt: dates[item._id].toDateString(),
		};
	});
};

const getReviewd = async (parent) => {
	const reviews = await Review.find({ userId: parent.id });
	let reviewData = {};
	const movies = await Movie.find({
		_id: {
			$in: reviews.map((review) => {
				reviewData[review.movieId] = review;
				return mongoose.Types.ObjectId(review.movieId);
			}),
		},
	});

	return movies.map((movie) => {
		return {
			id: reviewData[movie._id]._id,
			movie,
			text: reviewData[movie._id].text,
			rating: reviewData[movie._id].rating,
			updatedAt: reviewData[movie._id].updatedAt.toDateString(),
		};
	});
};

module.exports = {
	getWished,
	getReviewd,
};
