import React from "react";
import { NavItem, StyledNavLink } from "../../style/styledNavbar";
import { LogOutOutline } from "@styled-icons/evaicons-outline";
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
				to="/" $icon
			>
				<LogOutOutline size="24" title="Logout" />
			</StyledNavLink>
		</NavItem>
	);
};

export default Logout;
