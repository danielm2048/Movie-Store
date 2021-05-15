require("dotenv").config();
const nodemailer = require("nodemailer");

const { MAIL_USERNAME, MAIL_PASSWORD } = require("../constants");

async function sendEmail(email, url) {
	// const testAccount = await nodemailer.createTestAccount();

	const transporter = nodemailer.createTransport({
		host: "smtp.zoho.com",
		port: 465,
		secure: true,
		auth: {
			user: MAIL_USERNAME,
			pass: MAIL_PASSWORD,
		},
		tls: { rejectUnauthorized: false },
	});

	const info = await transporter.sendMail({
		from: `"Daniel from Movie Affilates 🎥" <${MAIL_USERNAME}>`, // sender address
		to: email, // list of receivers
		subject: "Forgot Password", // Subject line
		text: "Forgot Password", // plain text body
		html: `<a href="${url}" style="background-color: #d13c3a;
    border: none;
    border-radius: 4px;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;">Click here!</a>`, // html body
	});

	console.log("Message sent: %s", info.messageId);
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = sendEmail;
