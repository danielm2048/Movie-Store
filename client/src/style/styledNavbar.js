import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { Menu } from "@styled-icons/evaicons-solid";

export const NavContainer = styled.div`
	position: sticky;
	top: 0;
	width: 100%;
	z-index: 2;
	background-color: ${(props) =>
		props.scroll || props.burgerMenuOpen ? "#ffffff" : "none"};
	box-shadow: ${(props) =>
		props.scroll || props.burgerMenuOpen
			? "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
			: "none"};
	transition: background-color 0.3s ease;
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
	@media screen and (max-width: 768px) {
		& li:not(:first-child) {
			display: ${(props) => (props.burgerMenuOpen ? "auto" : "none")};
		}
	}
`;

export const NavItem = styled.li`
	padding: 25px 0;
	float: ${(props) => (props.right ? "right" : "left")};
	@media screen and (max-width: 768px) {
		float: none;
		margin: 0 auto;
	}
`;

export const StyledNavLink = styled(NavLink)`
	display: inline-block;
	position: relative;
	background: none;
	cursor: pointer;
	color: black;
	font-family: "Gotu", sans-serif;
	font-weight: 700;
	text-align: center;
	border-radius: 50px;
	line-height: ${(props) => (props.$icon ? "1" : "1.5")};
	min-height: 24px;
	min-width: 24px;
	margin-top: ${(props) => (props.$icon ? "2px" : "0")};
	padding: ${(props) => (props.$icon ? "12px 4px" : "15px 9px")};
	font-size: 15px;
	text-decoration: none;
	z-index: 10;
	@media screen and (max-width: 768px) {
		padding: 25px 26px;
	}

	&:before,
	&:after {
		content: "";
		display: block;
		position: absolute;
		background: inherit;
		border: inherit;
		border-radius: inherit;
		color: #222222;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		transform: rotate(0.0001deg);
	}

	&:before {
		background: #222222;
		transform: scale(0.7) perspective(1px);
		box-shadow: 0 4px 20px rgba(34, 34, 34, 0.15);
		opacity: 0;
		transition: transform 200ms cubic-bezier(0.345, 0.115, 0.135, 1.42),
			opacity 150ms ease-out;
	}

	&:after {
		transition: transform 200ms cubic-bezier(0.345, 0.115, 0.135, 1.42),
			background 150ms ease-out, box-shadow 200ms ease-out;
	}

	&:hover:after {
		opacity: 1;
		transform: scaleX(1.015) scaleY(1.035) perspective(1px);
	}

	&:hover:before {
		opacity: 0.075;
		transform: scale(1) perspective(1px);
	}
`;

export const AutoComplete = styled.div`
	font-family: "Gotu", sans-serif;
	padding: 28px 26px;
	margin: auto;

	display: block;
	position: absolute;

	@media screen and (max-width: 768px) {
		padding: 15px 26px;
		display: inline-block;
		position: relative;
	}
	&:after {
		content: "";
		background: black;
		width: 3px;
		height: 20px;
		position: absolute;
		top: 60px;
		right: 25px;
		transform: rotate(135deg);
	}
`;

export const AnimatedSearch = styled.input`
	color: black;
	font-size: 16px;
	background: transparent;
	width: 45px;
	height: 45px;
	padding: 10px;
	border: solid 3px black;
	outline: none;
	border-radius: 35px;
	transition: width 0.5s;
	@media screen and (max-width: 768px) {
		padding: 25px;
	}

	&::placeholder {
		color: black;
		opacity: 0;
		transition: opacity 150ms ease-out;
	}

	&:focus::placeholder {
		opacity: 1;
	}

	&:focus,
	&:not(:placeholder-shown) {
		width: 250px;
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
	max-width: 250px;
	word-wrap: break-word;
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

export const BurgerMenu = styled(Menu)`
	display: none;

	@media screen and (max-width: 768px) {
		display: inline-block;
		position: absolute;
		right: 0;
		top: 40px;
	}
`;
