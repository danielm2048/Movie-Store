import React from "react";
import { List } from "@styled-icons/fa-solid";
import {
	Nav,
	NavItem,
	StyledNavLink,
	NavLinkHover,
	NavContainer,
} from "../../style/styledNavbar";
import logo from "../../style/images/newLogo.png";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Logout from "../auth/Logout";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../../graphql/gqlDocs";
import Search from "./Search";

const NavBar = () => {
	const { data, loading } = useQuery(GET_USER);

	const authLinks = (
		<>
			<Logout />
			<NavItem right>
				<StyledNavLink to="/wishlist">
					<NavLinkHover>
						<List size="16" title="My Wishlist" />
					</NavLinkHover>
				</StyledNavLink>
			</NavItem>
		</>
	);

	const adminLinks = (
		<>
			<NavItem>
				<StyledNavLink to="/admin-section">
					<NavLinkHover>Admin Section</NavLinkHover>
				</StyledNavLink>
			</NavItem>
		</>
	);

	const guestLinks = (
		<>
			<Login />
			<Register />
		</>
	);

	return (
		<NavContainer>
			<Nav>
				<NavItem>
					<StyledNavLink to="/" style={{ padding: "18px 25px" }}>
						<img src={logo} alt="logo" style={{ height: 65, width: 220 }}></img>
					</StyledNavLink>
				</NavItem>
				{data && data.getUser && !loading
					? data.getUser.admin
						? adminLinks
						: null
					: null}
				<NavItem>
					<StyledNavLink to="/about">
						<NavLinkHover>About</NavLinkHover>
					</StyledNavLink>
				</NavItem>
				<NavItem>
					<StyledNavLink to="/movies">
						<NavLinkHover>Catalogue</NavLinkHover>
					</StyledNavLink>
				</NavItem>
				<NavItem>
					<Search />
				</NavItem>
				{data && data.getUser && !loading ? authLinks : guestLinks}
			</Nav>
		</NavContainer>
	);
};

export default NavBar;
