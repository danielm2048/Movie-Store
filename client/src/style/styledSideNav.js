import styled from "styled-components";
import { Link } from "react-router-dom";
import { Unwish } from "./styledWishlist";

export const SideNav = styled.div`
	height: 100%;
	width: ${(props) => (props.sideNav ? "350px" : 0)};
	position: fixed;
	z-index: 4;
	top: 0;
	left: 0;
	background-color: white;
	font-family: "Gotu", sans-serif;
	overflow-x: hidden;
	transition: 0.5s;
	padding-top: 60px;
	@media screen and (max-height: 450px) {
		padding-top: 15px;
	}
`;

export const SideNavTitle = styled.h4`
	position: absolute;
	left: 25px;
	top: 8px;
	color: #000;
	font-size: 20px;
	font-weight: bold;
`;

export const SideItem = styled.div`
	display: flex;
	flex-direction: row;
	padding: 8px 8px 8px 32px;
	@media screen and (max-height: 450px) {
		padding-top: 18px;
	}
`;

export const SideLink = styled(Link)`
	display: block;
	text-decoration: none;
	font-size: 14px;
	/* width: 25%; */
	color: #2196f3;
	transition: 0.3s;
	&:hover {
		color: #7bbcf1;
	}
`;

export const Remove = styled(Unwish)`
	display: flex;
	margin: 0 0 0 auto;
	font-size: 16px;
`;

export const SidePrice = styled.span`
	display: flex;
	margin: 0 auto;
	font-size: 16px;
`;

export const SideQuantity = styled.input`
	margin: 5px auto;
	width: 25%;
	height: 35%;
`;

export const SideNavTrigger = styled.button`
	position: fixed;
	margin-left: ${(props) => (props.sideNav ? "350px" : 0)};
	transition: 0.5s;
	bottom: 20px;
	left: 30px;
	z-index: 99;
	border: none;
	outline: none;
	background-color: white;
	box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.4);
	color: black;
	cursor: pointer;
	padding: 15px;
	border-radius: 10px;
	font-size: 18px;
	&:hover {
		background-color: #555;
	}
`;

export const Badge = styled.span`
	position: absolute;
	top: -10px;
	right: -10px;
	padding: 4px 8px;
	border-radius: 50%;
	background: tomato;
	color: white;
	font-size: 14px;
`;
