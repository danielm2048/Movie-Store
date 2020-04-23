const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const Movie = require("../models/movies.model");

const { ACCESS_SECRET } = require("../constants");

const getUser = (_, __, { req }) => {
	const Authorization = req.get("Authorization");
	if (Authorization) {
		const token = Authorization.replace("Bearer ", "");
		const { userId } = jwt.verify(token, ACCESS_SECRET);
		return User.findById(userId);
	}

	return null;
};

const getMovie = (_, args) => {
	return Movie.findOne({ _id: args.movieId });
};

const getMovies = () => Movie.find().sort("name");

module.exports = {
	getUser,
	getMovie,
	getMovies,
};
