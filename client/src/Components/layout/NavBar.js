import React from "react";
import { List } from "@styled-icons/fa-solid";
import {
	Nav,
	NavItem,
	StyledNavLink,
	SearchForm,
	AnimatedSearch,
} from "../../style/styledNavbar";
import logo from "../../style/Logo.png";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Logout from "../auth/Logout";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../../graphql/gqlDocs";
import { useStoreActions, useStoreState } from "easy-peasy";

const NavBar = () => {
	const { data, loading } = useQuery(GET_USER);

	const searchInput = useStoreState((state) => state.search.input);
	const setInput = useStoreActions((actions) => actions.search.setInput);

	const onInputChange = (e) => {
		setInput(e.target.value);
	};

	const authLinks = (
		<React.Fragment>
			<Logout />
			<NavItem right>
				<StyledNavLink to="/wishlist">
					<List size="16" title="My Wishlist" />
				</StyledNavLink>
			</NavItem>
		</React.Fragment>
	);

	const adminLinks = (
		<React.Fragment>
			<NavItem>
				<StyledNavLink to="/admin-section">Admin Section</StyledNavLink>
			</NavItem>
		</React.Fragment>
	);

	const guestLinks = (
		<React.Fragment>
			<Login />
			<Register />
		</React.Fragment>
	);

	return (
		<Nav>
			<NavItem>
				<StyledNavLink to="/" style={{ padding: "18px 25px" }}>
					<img src={logo} alt="logo" style={{ height: 61, width: 240 }}></img>
				</StyledNavLink>
			</NavItem>
			{data && data.getUser && !loading
				? data.getUser.admin
					? adminLinks
					: null
				: null}
			<NavItem>
				<StyledNavLink to="/movies">Catalogue</StyledNavLink>
			</NavItem>
			<NavItem>
				<SearchForm
					autoComplete="off"
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<AnimatedSearch
						type="text"
						name="search"
						placeholder="Search..."
						value={searchInput}
						onChange={onInputChange}
					/>
				</SearchForm>
			</NavItem>
			{data && data.getUser && !loading ? authLinks : guestLinks}
		</Nav>
	);
};

export default NavBar;
