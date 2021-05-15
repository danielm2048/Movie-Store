require("dotenv").config();

const REFRESH_SECRET = process.env.REFRESH_SECRET;
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const MAIL_USERNAME = process.env.MAIL_USERNAME;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

module.exports = {
	REFRESH_SECRET,
	ACCESS_SECRET,
	MAIL_USERNAME,
	MAIL_PASSWORD,
};
