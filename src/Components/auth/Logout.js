import React from "react";
import { NavItem, StyledNavLink } from "../../style/styledNavbar";
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
				<SignOutAlt size="18" title="Logout" />
			</StyledNavLink>
		</NavItem>
	);
};

export default Logout;
