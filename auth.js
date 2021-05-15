const jwt = require("jsonwebtoken");
const { REFRESH_SECRET, ACCESS_SECRET } = require("./constants");

const User = require("./models/users.model");

const createAccessToken = (user) => {
	const accessToken = jwt.sign(
		{ userId: user.id, role: user.admin ? "ADMIN" : "USER" },
		ACCESS_SECRET,
		{
			expiresIn: "5min",
		}
	);

	return accessToken;
};

const createRefreshToken = (user) => {
	const refreshToken = jwt.sign(
		{ userId: user.id, tokenVersion: user.tokenVersion },
		REFRESH_SECRET,
		{
			expiresIn: "7d",
		}
	);

	return refreshToken;
};

const sendRefreshToken = (res, token) => {
	res.cookie("refresh-token", token, {
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
		httpOnly: true,
		path: "/refresh_token",
		secure: true,
	});
};

const invalidateTokens = async (userId) => {
	const user = await User.findById(userId);
	if (!user) {
		return false;
	}
	user.tokenVersion += 1;
	await user.save();

	return true;
};

module.exports = {
	createAccessToken,
	createRefreshToken,
	sendRefreshToken,
	invalidateTokens,
};
