const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type Query {
		getUser: User
		getMovie(movieId: String!): Movie
		getMovies: [Movie!]!
	}

	type Mutation {
		addMovie(
			name: String!
			releaseDate: String!
			description: String!
			director: String!
			cast: [String!]!
			genre: String!
			runtime: Int!
			language: String!
			availableIn: [AvailableInInput!]!
			cover: String!
		): Movie!
		wishMovie(userId: String!, movieId: String!, active: Boolean!): Boolean!
		signupUser(
			username: String!
			email: String!
			password: String!
		): AuthPayLoad
		loginUser(email: String!, password: String!): AuthPayLoad
		logoutUser: Boolean!
		invalidateTokens: Boolean!
	}

	type AvailableIn {
		format: String!
		price: Int!
		stock: Int!
	}

	input AvailableInInput {
		format: String!
		price: Int!
		stock: Int!
	}

	# type Subscription {
	#   newMovie: Movie
	# }

	type Wish {
		movie: Movie!
		updatedAt: String!
	}

	type AuthPayLoad {
		accessToken: String
		user: User
	}

	type User {
		id: ID!
		username: String!
		email: String!
		password: String!
		admin: Boolean!
		wishlist: [Wish!]
	}

	type Movie {
		id: ID!
		name: String!
		releaseDate: String!
		description: String!
		director: String!
		cast: [String!]!
		genre: String!
		runtime: Int!
		language: String!
		availableIn: [AvailableIn!]!
		cover: String!
		wishers: [User!]
	}
`;

module.exports = typeDefs;
