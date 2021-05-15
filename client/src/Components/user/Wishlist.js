import React from "react";
import { Link } from "react-router-dom";
import {
	Container,
	ResponsiveTable,
	TableHeader,
	TableRow,
	Column,
	Unwish,
	Warning,
} from "../../style/styledWishlist";
import { useQuery, useMutation } from "react-apollo";
import { GET_USER, WISH } from "../../graphql/gqlDocs";

import { Close } from "@styled-icons/evaicons-solid";
import ReviewSection from "../movies/ReviewSection";

const TableItem = ({ index, movieName, genre, movieId, updatedAt, remove }) => {
	const click = () => {
		remove(movieId);
	};

	return (
		<TableRow>
			<Column col="5%" data-label="#">
				{index + 1}
			</Column>
			<Column col="40%" data-label="Movie's Name">
				<Link to={`/movie/${movieId}`}>{movieName}</Link>
			</Column>
			<Column col="25%" data-label="Genre">
				<span>{genre}</span>
			</Column>
			<Column col="15%" data-label="Unwish">
				<Unwish onClick={click}>
					<Close size="24" />
				</Unwish>
			</Column>
			<Column col="15%" data-label="Date Added">
				{updatedAt}
			</Column>
		</TableRow>
	);
};

const Wishlist = () => {
	const { data, loading, refetch } = useQuery(GET_USER);

	const [unwish] = useMutation(WISH);

	if (loading)
		return (
			<div className="lds-ripple">
				<div></div>
				<div></div>
			</div>
		);

	const remove = async (movieId) => {
		if (data && data.getUser) {
			await unwish({
				variables: {
					userId: data.getUser.id,
					movieId,
					active: false,
				},
			});
			refetch();
		}
	};

	const wishedMovies = data.getUser.wishlist.sort(
		(a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
	);

	return wishedMovies.length > 0 ? (
		<>
			<Container>
				<ResponsiveTable>
					<TableHeader>
						<Column col="5%"></Column>
						<Column col="40%">Movie's Name</Column>
						<Column col="25%">Genre</Column>
						<Column col="15%">Unwish</Column>
						<Column col="15%">Date Added</Column>
					</TableHeader>
					{wishedMovies.map((w, i) => (
						<TableItem
							key={i}
							index={i}
							movieName={w.movie.name}
							genre={w.movie.genre}
							movieId={w.movie.id}
							updatedAt={w.updatedAt}
							remove={remove}
						/>
					))}
				</ResponsiveTable>
			</Container>

			<ReviewSection user={data.getUser} />
		</>
	) : (
		<Warning>You have 0 wishes!!</Warning>
	);
};

export default Wishlist;
