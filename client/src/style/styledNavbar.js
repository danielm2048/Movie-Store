import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavContainer = styled.div`
	position: sticky;
	top: 0;
	width: 100%;
	z-index: 2;
	background-color: #f0f2f3;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	@media screen and (max-width: 768px) {
		position: relative;
	}
`;

export const Nav = styled.ul`
	list-style-type: none;
	max-width: 1400px;
	margin: 0 auto;
	padding: 0;
	overflow: hidden;
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
	font-family: "Gotu", sans-serif;
	font-weight: 700;
	text-align: center;
	padding: 25px 5px;
	font-size: 18px;
	text-decoration: none;
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
		background-color: #bdc2c9;
	}
`;

export const AutoComplete = styled.div`
	position: absolute;
	display: block;
	padding: 28px 26px;
	margin: auto;
	font-family: "Gotu", sans-serif;
	&::after {
		content: "";
		clear: both;
		display: table;
	}
	@media screen and (max-width: 768px) {
		position: relative;
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
	background-position: 0% 50%;
	background-size: 24px;
	background-repeat: no-repeat;
	padding: 12px 20px 12px 40px;
	-webkit-transition: width 0.4s ease-in-out;
	transition: width 0.4s ease-in-out;
	&:focus {
		width: 100%;
	}
`;

export const AutoCompleteItemList = styled.div`
	position: relative;
	border: 1px solid #d4d4d4;
	border-bottom: none;
	border-top: none;
	z-index: 99;
	top: 100%;
	left: 0;
	right: 0;
`;

export const AutoCompleteItem = styled.div`
	padding: 10px;
	cursor: pointer;
	font-size: 18px;
	background-color: ${(props) =>
		props.active ? "DodgerBlue !important" : "#fff"};
	color: ${(props) => (props.active ? "#ffffff" : "#000000")};
	border-bottom: 1px solid #d4d4d4;
	&:hover {
		background-color: #e9e9e9;
	}
`;
