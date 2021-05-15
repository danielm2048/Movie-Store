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
			reviews {
				id
				movie {
					id
					name
					cover
				}
				text
				rating
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
				reviews {
					id
					movie {
						id
						name
						cover
					}
					text
					rating
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
				reviews {
					id
					movie {
						id
						name
						cover
					}
					text
					rating
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

export const FORGOT_PASSWORD = gql`
	mutation ForgotPassword($email: String!) {
		forgotPassword(email: $email)
	}
`;

export const CHANGE_PASSWORD = gql`
	mutation ChangePassword($token: String!, $password: String!) {
		changePassword(token: $token, password: $password)
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
			reviews {
				id
				user {
					id
					username
				}
				text
				rating
				updatedAt
			}
			suggested {
				id
				name
				cover
				reviews {
					id
					rating
				}
				availableIn {
					price
				}
			}
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
			reviews {
				id
				user {
					id
					username
				}
				text
				rating
			}
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
	mutation WishMovie($movieId: String!, $active: Boolean!) {
		wishMovie(movieId: $movieId, active: $active)
	}
`;

export const REVIEW_MOVIE = gql`
	mutation ReviewMovie($movieId: String!, $text: String!, $rating: Int!) {
		reviewMovie(movieId: $movieId, text: $text, rating: $rating) {
			id
		}
	}
`;

export const DELETE_REVIEW = gql`
	mutation DeleteReview($reviewId: String!) {
		deleteReview(reviewId: $reviewId)
	}
`;
