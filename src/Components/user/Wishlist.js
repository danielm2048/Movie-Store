import React from "react";
import { Link } from "react-router-dom";
import { Table, TR, TH, TD, Warning } from "../../style/styledWishlist";
import { useQuery, useMutation } from "react-apollo";
import { GET_USER, WISH } from "../../graphql/gqlDocs";
import { Unwish } from "../../style/styledWishlist";

const TableItem = ({ index, movieName, genre, movieId, updatedAt, remove }) => {
	const click = () => {
		remove(movieId);
	};

	return (
		<TR>
			<TH scope="row">{index + 1}</TH>
			<TD>
				<Link to={`/movie/${movieId}`}>{movieName}</Link>
			</TD>
			<TD>
				<span>{genre}</span>
			</TD>
			<TD>
				<Unwish onClick={click}>&times;</Unwish>
			</TD>
			<TD>{updatedAt}</TD>
		</TR>
	);
};

const Wishlist = () => {
	const { data: dataUser, loading: loadUser, refetch } = useQuery(GET_USER);

	const [unwish] = useMutation(WISH);

	if (loadUser)
		return (
			<div className="lds-ripple">
				<div></div>
				<div></div>
			</div>
		);

	const remove = async (movieId) => {
		if (dataUser && dataUser.getUser) {
			await unwish({
				variables: {
					userId: dataUser.getUser.id,
					movieId,
					active: false,
				},
			});
			refetch();
		}
	};

	const wishedMovies = dataUser.getUser.wishlist.sort(
		(a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
	);

	return wishedMovies.length > 0 ? (
		<div style={{ overflowX: "auto" }}>
			<Table>
				<thead>
					<TR>
						<TH>#</TH>
						<TH>Movie's Name</TH>
						<TH>Genre</TH>
						<TH>Unwish</TH>
						<TH>Date Added</TH>
					</TR>
				</thead>
				<tbody>
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
				</tbody>
			</Table>
		</div>
	) : (
		<Warning>You have 0 wishes!!</Warning>
	);
};

export default Wishlist;
