const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require("path");

require("dotenv").config();

const port = process.env.PORT || 4000;
const { REFRESH_SECRET } = require("./constants");

const User = require("./models/users.model");
const {
	createAccessToken,
	createRefreshToken,
	sendRefreshToken,
} = require("./auth");

const typeDefs = require("./graphql/schema");
const UserResolver = require("./resolvers/UserResolver");
const MovieResolver = require("./resolvers/MovieResolver");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");

const resolvers = {
	User: {
		wishlist: UserResolver.getWished,
		reviews: UserResolver.getReviewd,
	},
	Movie: {
		wishers: MovieResolver.getWishers,
		reviews: MovieResolver.getReviews,
		suggested: MovieResolver.getSuggested,
	},
	Query,
	Mutation,
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req, res }) => ({ req, res }),
});

const app = express();
app.use(
	cors({
		origin: "https://movie-affiliates.herokuapp.com",
		credentials: true,
	})
);
app.use(helmet());

app.post("/refresh_token", cookieParser(), async (req, res) => {
	const token = req.cookies["refresh-token"];
	if (!token) {
		return res.send({ ok: false, accessToken: "" });
	}

	let payload = null;
	try {
		payload = jwt.verify(token, REFRESH_SECRET);
	} catch (err) {
		console.log(err);
		return res.send({ ok: false, accessToken: "" });
	}

	const user = await User.findById(payload.userId);

	if (!user) {
		return res.send({ ok: false, accessToken: "" });
	}

	if (user.tokenVersion !== payload.tokenVersion) {
		return res.send({ ok: false, accessToken: "" });
	}

	sendRefreshToken(res, createRefreshToken(user));

	return res.send({ ok: true, accessToken: createAccessToken(user) });
});

if (process.env.NODE_ENV === "production") {
	app.use((req, res, next) => {
		if (req.header("x-forwarded-proto") !== "https")
			res.redirect(`https://${req.header("host")}${req.url}`);
		else next();
	});

	app.use(express.static("public"));

	app.get("*", (_, res) => {
		res.sendFile(path.resolve(__dirname, "public", "index.html"));
	});
}

server.applyMiddleware({ app, cors: false });

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true,
});
const connection = mongoose.connection;

connection.once("open", () => {
	console.log("MongoDB database connection established successfully");
	app.listen(port, () => {
		console.log(`🚀 Now browse to port ${port}` + server.graphqlPath);
	});
});
