const bcrypt = require("bcryptjs");
require("dotenv").config();

const { getUserId, getAdminId } = require("../middleware/authMiddleware");
const {
	createAccessToken,
	createRefreshToken,
	sendRefreshToken,
	invalidateTokens,
} = require("../auth");
const sendEmail = require("../utils/sendEmail");
const createUrl = require("../utils/createUrl");

const Movie = require("../models/movies.model");
const Wishlist = require("../models/wishlist.model");
const Review = require("../models/reviews.model");
const User = require("../models/users.model");
const Token = require("../models/tokens.model");

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

const forgotPassword = async (_, args) => {
	const user = await User.findOne({ email: args.email });
	if (!user) {
		throw new Error("No user found with this email");
	}

	const token = await Token.findOne({ userId: user._id });
	if (token) {
		throw new Error("An email was already sent");
	}

	const url = await createUrl(user._id);

	await sendEmail(args.email, url);

	return true;
};

const changePassword = async (_, args, { res }) => {
	const token = await Token.findOne({ token: args.token });
	if (!token) {
		throw new Error("Token is invalid");
	}

	const user = await User.findOne({ _id: token.userId });

	if (!user) {
		throw new Error("User does not exist");
	}

	const password = await bcrypt.hash(args.password, 12);
	user.password = password;

	await user.save();
	await token.deleteOne();
	await invalidateTokens(user._id);

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
	const userId = getUserId(req);

	const filter = { userId, movieId: args.movieId };
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

const reviewMovie = async (_, args, { req }) => {
	const userId = getUserId(req);

	const filter = { userId, movieId: args.movieId };
	const update = { text: args.text, rating: args.rating };
	let doc = await Review.findOneAndUpdate(filter, update, {
		new: true,
		upsert: true,
	});
	if (!doc) {
		throw new Error("Reviewing didn't work!");
	}
	return doc;
};

const deleteReview = async (_, args, { req }) => {
	getUserId(req);

	const res = await Review.deleteOne({ _id: args.reviewId });
	if (res.ok) {
		return true;
	}
	throw new Error("Deleting the review didn't work!");
};

module.exports = {
	signupUser,
	loginUser,
	logoutUser,
	forgotPassword,
	changePassword,
	addMovie,
	wishMovie,
	reviewMovie,
	deleteReview,
};
