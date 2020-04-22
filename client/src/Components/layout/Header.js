import React from "react";
import { HeaderDiv, HeaderTitle, HeaderCredit } from "../../style/styledLayout";
import { GET_USER } from "../../graphql/gqlDocs";
import { useQuery } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";

const Header = ({ history }) => {
	const { data, loading } = useQuery(GET_USER);

	let title = "";
	switch (history.location.pathname) {
		case "/":
			title =
				data && data.getUser && !loading
					? `WELCOME ${data.getUser.username}!`
					: "Movie Affiliates";
			break;
		case "/wishlist":
			title = "Wishlist";
			break;
		case "/checkout":
			title = "Checkout";
			break;
		case "/admin-section":
			title = "Admin Section";
			break;
		default:
			title = "Catalogue";
			break;
	}

	return (
		<HeaderDiv>
			<HeaderTitle>{title}</HeaderTitle>
			<HeaderCredit>
				By the amazing{" "}
				<a href="https://pixabay.com/users/asi24-2397893/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1614707">
					asi24
				</a>{" "}
				from{" "}
				<a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1614707">
					Pixabay
				</a>
			</HeaderCredit>
		</HeaderDiv>
	);
};

export default withRouter(Header);
