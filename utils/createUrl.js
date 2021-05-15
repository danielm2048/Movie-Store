const { nanoid } = require("nanoid");

const Token = require("../models/tokens.model");

const createUrl = async (userId) => {
	const token = nanoid(12);

	const newToken = new Token({
		token,
		userId,
	});
	await newToken.save();

	return `https://movie-affiliates.herokuapp.com/change-password/${token}`;
};

module.exports = createUrl;
