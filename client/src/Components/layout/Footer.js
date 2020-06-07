import React from "react";
import {
	StyledFooter,
	FooterMenu,
	FooterMenuList,
	FooterMenuItem,
	FooterMenuLink,
} from "../../style/styledLayout";
import { Code, Heart } from "@styled-icons/fa-solid/";
import { LinkedinSquare, Github } from "@styled-icons/boxicons-logos";
import { useQuery } from "react-apollo";
import { GET_USER } from "../../graphql/gqlDocs";

const Footer = () => {
	const { data, loading } = useQuery(GET_USER);

	return (
		<StyledFooter>
			<FooterMenu>
				<FooterMenuList>
					<h2>Sitemap</h2>

					<FooterMenuItem>
						<FooterMenuLink to="/">Home</FooterMenuLink>
					</FooterMenuItem>

					<FooterMenuItem>
						<FooterMenuLink to="/movies">Catalogue</FooterMenuLink>
					</FooterMenuItem>

					{data && data.getUser && !loading ? (
						<FooterMenuItem>
							<FooterMenuLink to="/wishlist">Wishlist</FooterMenuLink>
						</FooterMenuItem>
					) : null}

					<FooterMenuItem>
						<FooterMenuLink to="/checkout">Checkout</FooterMenuLink>
					</FooterMenuItem>
				</FooterMenuList>

				<FooterMenuList>
					<h2>Connect</h2>

					<FooterMenuItem>
						<FooterMenuLink to="/about">About</FooterMenuLink>
					</FooterMenuItem>

					<FooterMenuItem>
						<FooterMenuLink to="/contact">Contact</FooterMenuLink>
					</FooterMenuItem>
				</FooterMenuList>

				<FooterMenuList>
					<h2>About Me</h2>

					<FooterMenuItem>
						<a
							href="https://www.linkedin.com/in/daniel-mimoun-6b05201a3/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<LinkedinSquare size="24" color="white" />
						</a>
					</FooterMenuItem>

					<FooterMenuItem>
						<a
							href="https://github.com/danielm2048"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Github size="24" color="white" />
						</a>
					</FooterMenuItem>
				</FooterMenuList>
			</FooterMenu>
			<div style={{ textAlign: "center", marginTop: 5 }}>
				<Code size="18" /> with <Heart size="18" /> by Daniel Mimoun
			</div>
		</StyledFooter>
	);
};

export default Footer;
