import gql from "graphql-tag";

export const GET_USER = gql`
	{
		getUser {
			id
			username
			email
			admin
			wishlist {
				movie {
					id
					name
					genre
				}
				updatedAt
			}
		}
	}
`;

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			accessToken
			user {
				id
				username
				email
				admin
				wishlist {
					movie {
						id
						name
						genre
					}
					updatedAt
				}
			}
		}
	}
`;

export const REGISTER = gql`
	mutation Register($username: String!, $email: String!, $password: String!) {
		signupUser(username: $username, email: $email, password: $password) {
			accessToken
			user {
				id
				username
				email
				admin
				wishlist {
					movie {
						id
						name
						genre
					}
					updatedAt
				}
			}
		}
	}
`;

export const LOGOUT = gql`
	mutation Logout {
		logoutUser
	}
`;

export const GET_MOVIE = gql`
	query GetMovie($movieId: String!) {
		getMovie(movieId: $movieId) {
			id
			name
			releaseDate
			description
			director
			cast
			genre
			runtime
			language
			availableIn {
				format
				price
				stock
			}
			cover
		}
	}
`;

export const GET_MOVIES = gql`
	{
		getMovies {
			id
			name
			releaseDate
			description
			director
			cast
			genre
			runtime
			language
			availableIn {
				format
				price
				stock
			}
			cover
		}
	}
`;

export const ADD_MOVIE = gql`
	mutation AddMovie(
		$name: String!
		$releaseDate: String!
		$description: String!
		$director: String!
		$cast: [String!]!
		$genre: String!
		$runtime: Int!
		$language: String!
		$availableIn: [AvailableInInput!]!
		$cover: String!
	) {
		addMovie(
			name: $name
			releaseDate: $releaseDate
			description: $description
			director: $director
			cast: $cast
			genre: $genre
			runtime: $runtime
			language: $language
			availableIn: $availableIn
			cover: $cover
		) {
			id
			createdAt
		}
	}
`;

export const WISH = gql`
	mutation WishMovie($userId: String!, $movieId: String!, $active: Boolean!) {
		wishMovie(userId: $userId, movieId: $movieId, active: $active)
	}
`;
