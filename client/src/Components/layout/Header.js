import React from "react";
import { HeaderDiv, HeaderTitle, HeaderCredit } from "../../style/styledLayout";
import { GET_USER } from "../../graphql/gqlDocs";
import { useQuery } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";

const homeHeader = "/images/home.jpg";
const catalogueHeader = "/images/red-popcorn-2.png";
const wishlistHeader = "/images/rickmorty.jpg";
const checkoutHeader = "/images/checkout.jpg";

const Header = ({ history }) => {
	const { data, loading } = useQuery(GET_USER);

	let title = "";
	let url = "";
	switch (history.location.pathname) {
		case "/":
			title =
				data && data.getUser && !loading
					? `WELCOME ${data.getUser.username}!`
					: "Movie Affiliates";
			url = homeHeader;
			break;
		case "/wishlist":
			title = "Wishlist";
			url = wishlistHeader;
			break;
		case "/checkout":
			title = "Checkout";
			url = checkoutHeader;
			break;
		case "/admin-section":
			title = "Admin Section";
			url = homeHeader;
			break;
		default:
			title = "Catalogue";
			url = catalogueHeader;
			break;
	}

	return (
		<HeaderDiv url={url}>
			<HeaderTitle>{title}</HeaderTitle>
			{url === wishlistHeader ? (
				<HeaderCredit>
					art by
					<a href="https://www.artstation.com/senhordotempo">Wilian Silva</a>
				</HeaderCredit>
			) : null}
		</HeaderDiv>
	);
};

export default withRouter(Header);
