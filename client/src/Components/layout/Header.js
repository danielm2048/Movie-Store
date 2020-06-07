import React from "react";
import { HeaderDiv, HeaderTitle, HeaderCredit } from "../../style/styledLayout";
import { withRouter } from "react-router-dom";

import aboutHeader from "../../style/images/home.jpg";
import catalogueHeader from "../../style/images/red-popcorn-2.png";
import wishlistHeader from "../../style/images/rickmorty.jpg";
import checkoutHeader from "../../style/images/checkout.jpg";

const Header = ({ history }) => {
	let title = "";
	let url = "";
	switch (history.location.pathname) {
		case "/":
			title = "";
			url = "";
			break;
		case "/about":
			title = "About";
			url = aboutHeader;
			break;
		case "/contact":
			title = "Contact";
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
		default:
			title = "Catalogue";
			url = catalogueHeader;
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
