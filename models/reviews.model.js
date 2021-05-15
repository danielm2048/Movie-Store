const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
	{
		userId: { type: String, required: true },
		movieId: { type: String, required: true },
		text: { type: String, required: true },
		rating: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
