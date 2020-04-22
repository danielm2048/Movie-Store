require("dotenv").config();

const REFRESH_SECRET = process.env.REFRESH_SECRET;
const ACCESS_SECRET = process.env.ACCESS_SECRET;

module.exports = {
	REFRESH_SECRET,
	ACCESS_SECRET
};
