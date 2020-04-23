const bcrypt = require("bcryptjs");
require("dotenv").config();

const { getUserId, getAdminId } = require("../middleware/authMiddleware");
const {
	createAccessToken,
	createRefreshToken,
	sendRefreshToken,
} = require("../auth");

const Movie = require("../models/movies.model");
const Wishlist = require("../models/wishlist.model");
const User = require("../models/users.model");

const signupUser = async (_, args, { res }) => {
	const user = await User.findOne({ email: args.email });
	if (user) {
		throw new Error("User already exists");
	}

	const password = await bcrypt.hash(args.password, 12);
	const newUser = new User({
		username: args.username,
		email: args.email,
		password,
		admin: false,
	});
	await newUser.save();

	sendRefreshToken(res, createRefreshToken(newUser));

	return { accessToken: createAccessToken(newUser), user: newUser };
};

const loginUser = async (_, args, { res }) => {
	const user = await User.findOne({ email: args.email });
	if (!user) {
		throw new Error("No such user found");
	}

	const valid = await bcrypt.compare(args.password, user.password);
	if (!valid) {
		throw new Error("Invalid password");
	}

	sendRefreshToken(res, createRefreshToken(user));

	return { accessToken: createAccessToken(user), user };
};

const logoutUser = async (_, __, { res }) => {
	sendRefreshToken(res, "");

	return true;
};

const addMovie = async (_, args, { req }) => {
	getAdminId(req);

	const newMovie = new Movie({
		name: args.name,
		releaseDate: args.releaseDate,
		description: args.description,
		director: args.director,
		cast: args.cast,
		genre: args.genre,
		runtime: args.runtime,
		language: args.language,
		availableIn: args.availableIn,
		cover: args.cover,
	});
	await newMovie.save();
	return newMovie;
};

const wishMovie = async (_, args, { req }) => {
	getUserId(req);

	const filter = { userId: args.userId, movieId: args.movieId };
	const update = { active: args.active };
	let doc = await Wishlist.findOneAndUpdate(filter, update, {
		new: true,
		upsert: true,
	});
	if (!doc) {
		throw new Error("Wishing didn't work!");
	}
	return true;
};

module.exports = {
	signupUser,
	loginUser,
	logoutUser,
	addMovie,
	wishMovie,
};
