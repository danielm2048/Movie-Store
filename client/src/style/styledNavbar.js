import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Nav = styled.ul`
	list-style-type: none;
	max-width: 1400px;
	margin: 0 auto;
	padding: 0;
	overflow: hidden;
	/* background-color: #f0f2f3; */
`;

export const NavItem = styled.li`
	float: ${(props) => (props.right ? "right" : "left")};
	@media screen and (max-width: 768px) {
		float: none;
	}
`;

export const StyledNavLink = styled(NavLink)`
	display: block;
	color: black;
	font-family: "Roboto", sans-serif;
	/* font-weight: 700; */
	text-align: center;
	padding: 25px 5px;
	font-size: 18px;
	text-decoration: none;
	/* background-color: ${(props) => (props.active ? "#777" : "none")};
	&:hover {
		background-color: ${(props) => (!props.active ? "#999" : "none")};
	} */
	@media screen and (max-width: 768px) {
		padding: 25px 26px;
	}
`;

export const NavLinkHover = styled.div`
	padding: 15px;
	backface-visibility: hidden;
	border-radius: 10px;
	transition: background-color 0.3s cubic-bezier(0.28, 0.84, 0.42, 1);
	&:hover {
		background-color: #999;
	}
`;

export const SearchForm = styled.form`
	display: block;
	padding: 28px 26px;
	margin: auto;
	&::after {
		content: "";
		clear: both;
		display: table;
	}
	@media screen and (max-width: 768px) {
		padding: 15px 26px;
	}
`;

export const AnimatedSearch = styled.input`
	width: 130px;
	box-sizing: border-box;
	border: 2px solid #ccc;
	border-radius: 4px;
	font-size: 15px;
	background-color: white;
	background-image: url("/images/search.png");
	background-position: 10px 10px;
	background-size: 22px;
	background-repeat: no-repeat;
	padding: 12px 20px 12px 40px;
	-webkit-transition: width 0.4s ease-in-out;
	transition: width 0.4s ease-in-out;
	&:focus {
		width: 100%;
	}
`;
