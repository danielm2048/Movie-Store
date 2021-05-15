import React from "react";
import { HeaderDiv, HeaderTitle, HeaderCredit } from "../../style/styledLayout";
import { withRouter, matchPath } from "react-router-dom";

import aboutHeader from "../../style/images/home.jpg";
import catalogueHeader from "../../style/images/red-popcorn-2.png";
import wishlistHeader from "../../style/images/rickmorty.jpg";
import checkoutHeader from "../../style/images/checkout.jpg";

const Header = ({ history }) => {
	let title = "";
	let url = "";

	const match = matchPath(history.location.pathname, {
		path: "/change-password/:token",
		exact: true,
		strict: false,
	});

	switch (history.location.pathname) {
		case "/about":
			title = "About";
			url = aboutHeader;
			break;
		case "/contact":
			title = "Contact";
			url = aboutHeader;
			break;
		case `/change-password/${match?.params.token}`:
			title = "Change Password";
			url = aboutHeader;
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
			url = aboutHeader;
			break;
		case "/movies":
			title = "Catalogue";
			url = catalogueHeader;
			break;
		default:
			title = "";
			url = "";
			break;
	}

	return (
		<HeaderDiv url={url} vis={url ? true : false}>
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
