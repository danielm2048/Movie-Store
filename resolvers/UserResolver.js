const mongoose = require("mongoose");
const Movie = require("../models/movies.model");
const Wishlist = require("../models/wishlist.model");

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
			updatedAt: dates[item._id].toISOString().slice(0, 10),
		};
	});
};

module.exports = {
	getWished,
};
