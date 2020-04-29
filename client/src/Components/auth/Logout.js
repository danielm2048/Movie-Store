import React from "react";
import { NavItem, StyledNavLink, NavLinkHover } from "../../style/styledNavbar";
import { SignOutAlt } from "@styled-icons/fa-solid";
import { useMutation } from "@apollo/react-hooks";
import { LOGOUT } from "../../graphql/gqlDocs";
import { useStoreActions } from "easy-peasy";

const Logout = () => {
	const setAccessToken = useStoreActions(
		(actions) => actions.user.setAccessToken
	);

	const [logout, { client }] = useMutation(LOGOUT);

	return (
		<NavItem right>
			<StyledNavLink
				onClick={async () => {
					await logout();
					setAccessToken("");
					await client.resetStore();
				}}
				to="/"
			>
				<NavLinkHover>
					<SignOutAlt size="16" title="Logout" />
				</NavLinkHover>
			</StyledNavLink>
		</NavItem>
	);
};

export default Logout;
