import React, { useEffect, useState } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { HeartIcon } from "../../style/styledIcons";
import {
	Nav,
	NavItem,
	StyledNavLink,
	NavContainer,
	BurgerMenu,
} from "../../style/styledNavbar";
import logo from "../../style/images/newLogo.png";
import AuthModal from "../auth/AuthModal";
import Logout from "../auth/Logout";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../../graphql/gqlDocs";
import Search from "./Search";

const NavBar = ({ history }) => {
	const { data, loading } = useQuery(GET_USER);

	const [scroll, setScroll] = useState(false);
	const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

	const authLinks = (
		<>
			<Logout />
			<NavItem right>
				<StyledNavLink to="/wishlist" $icon>
					<HeartIcon size="24" title="My Wishlist" />
				</StyledNavLink>
			</NavItem>
		</>
	);

	const adminLinks = (
		<>
			<NavItem right>
				<StyledNavLink to="/admin-section">Admin Section</StyledNavLink>
			</NavItem>
		</>
	);

	const guestLinks = <AuthModal />;

	const handleScroll = () => {
		if (window.scrollY < 75) {
			setScroll(false);
		} else {
			setScroll(true);
		}
	};

	useEffect(() => {
		if (history.location.pathname === "/") {
			if (window.scrollY === 0) {
				setScroll(false);
			}
			window.addEventListener("scroll", handleScroll);
			return () => {
				window.removeEventListener("scroll", handleScroll);
			};
		} else {
			setScroll(true);
		}
	}, [scroll, history.location.pathname]);

	return (
		<NavContainer scroll={scroll} burgerMenuOpen={burgerMenuOpen}>
			<Nav burgerMenuOpen={burgerMenuOpen}>
				<NavItem>
					<NavLink to="/" style={{ padding: "18px 25px" }}>
						<img src={logo} alt="logo" style={{ height: 65, width: 220 }}></img>
					</NavLink>
				</NavItem>
				{data && data.getUser && !loading
					? data.getUser.admin
						? adminLinks
						: null
					: null}
				{data && data.getUser && !loading ? authLinks : guestLinks}
				<NavItem right>
					<StyledNavLink to="/about">About</StyledNavLink>
				</NavItem>
				<NavItem right>
					<StyledNavLink to="/movies">Catalogue</StyledNavLink>
				</NavItem>
				<NavItem style={{ padding: 0 }}>
					<Search />
				</NavItem>
				<BurgerMenu onClick={() => setBurgerMenuOpen(!burgerMenuOpen)} />
			</Nav>
		</NavContainer>
	);
};

export default withRouter(NavBar);
