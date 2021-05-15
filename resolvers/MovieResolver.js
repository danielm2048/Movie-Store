const mongoose = require("mongoose");
const User = require("../models/users.model");
const Wishlist = require("../models/wishlist.model");
const Review = require("../models/reviews.model");

const { getAdminId } = require("../middleware/authMiddleware");
const Movie = require("../models/movies.model");

const getWishers = async (parent, _, { req }) => {
	getAdminId(req);

	const list = await Wishlist.find({ movieId: parent.id, active: true });
	const users = await User.find({
		_id: { $in: list.map((item) => mongoose.Types.ObjectId(item.userId)) },
	});
	return users;
};

const getReviews = async (parent) => {
	const reviews = await Review.find({ movieId: parent.id });
	let reviewData = {};
	const users = await User.find({
		_id: {
			$in: reviews.map((review) => {
				reviewData[review.userId] = review;
				return mongoose.Types.ObjectId(review.userId);
			}),
		},
	});

	return users.map((user) => {
		return {
			id: reviewData[user._id]._id,
			user,
			text: reviewData[user._id].text,
			rating: reviewData[user._id].rating,
			updatedAt: reviewData[user._id].updatedAt.toDateString(),
		};
	});
};

const getSuggested = async (parent) => {
	const movies = await Movie.find();
	const shuffled = movies.sort(() => 0.5 - Math.random());

	let count = 0;
	const suggested = shuffled.filter((movie) => {
		if (
			movie._id.toString() !== parent.id &&
			movie.genre === parent.genre &&
			count < 3
		) {
			count++;
			return true;
		}
		return false;
	});

	return suggested;
};

module.exports = {
	getWishers,
	getReviews,
	getSuggested,
};
