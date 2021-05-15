import styled from "styled-components";
import { StyledNavLink } from "./styledNavbar";
import { PersonOutline, HeartOutline } from "@styled-icons/evaicons-outline";

export const UserIcon = styled(PersonOutline)`
	transition: fill 0.1s;
	${StyledNavLink}:hover & {
		fill: black;
	}
`;

export const HeartIcon = styled(HeartOutline)`
	transition: fill 0.1s;
	${StyledNavLink}:hover & {
		fill: red;
	}
`;
