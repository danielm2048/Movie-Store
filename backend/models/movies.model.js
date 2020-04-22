const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema(
	{
		name: { type: String, required: true },
		releaseDate: { type: String, required: true },
		description: { type: String, required: true },
		director: { type: String, required: true },
		cast: [{ type: String, required: true }],
		genre: { type: String, required: true },
		runtime: { type: Number, required: true },
		language: { type: String, required: true },
		availableIn: [
			{
				format: { type: String, required: true },
				price: { type: Number, required: true },
				stock: { type: Number, required: true },
			},
		],
		cover: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
