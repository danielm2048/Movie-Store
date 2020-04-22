import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Nav = styled.ul`
	list-style-type: none;
	margin: 0;
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
	padding: 45px 28px;
	font-size: 23px;
	text-decoration: none;
	background-color: ${(props) => (props.active ? "#777" : "none")};
	&:hover {
		background-color: ${(props) => (!props.active ? "#999" : "none")};
	}
	@media screen and (max-width: 768px) {
		padding: 25px 28px;
	}
`;

export const SearchForm = styled.form`
	display: block;
	padding: 35px 28px;
	margin: auto;
	&::after {
		content: "";
		clear: both;
		display: table;
	}
	@media screen and (max-width: 768px) {
		padding: 15px 28px;
	}
`;

export const AnimatedSearch = styled.input`
	width: 130px;
	box-sizing: border-box;
	border: 2px solid #ccc;
	border-radius: 4px;
	font-size: 16px;
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
