import styled from "styled-components";
import { Link } from "react-router-dom";

export const SideNav = styled.div`
	height: 100%;
	width: ${(props) => (props.sideNav ? "420px" : 0)};
	position: fixed;
	z-index: 4;
	top: 0;
	left: 0;
	background-color: white;
	font-family: "Gotu", sans-serif;
	overflow-x: hidden;
	transition: 0.2s;
	padding-top: 60px;
	@media screen and (max-width: 768px) {
		width: ${(props) => (props.sideNav ? "300px" : 0)};
	}
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
	justify-content: space-between;
	align-items: center;
	padding: 8px 8px 8px 32px;
	margin-bottom: 25px;
	@media screen and (max-height: 450px) {
		padding-top: 18px;
	}
`;

export const SideLink = styled(Link)`
	display: block;
	text-decoration: none;
	font-size: 14px;
	color: #2196f3;
	transition: 0.2s;
	&:hover {
		color: #7bbcf1;
	}
`;

export const QuantityButton = styled.button`
	background-color: white;
	border: 1px solid #e0e0e0;
	text-align: center;
	display: inline-block;
	font-size: 22px;
	cursor: pointer;
	outline: none;
`;

export const SidePrice = styled.span`
	font-size: 16px;
`;

export const SideQuantity = styled.input`
	width: 60%;
	text-align: center;
	font-size: 16px;
	border: 1px solid #e0e0e0;
	border-left: none;
	border-right: none;
	outline: none;
`;

export const SideNavTrigger = styled.button`
	position: fixed;
	margin-left: ${(props) => (props.sideNav ? "420px" : 0)};
	transition: 0.2s;
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
	@media screen and (max-width: 768px) {
		margin-left: ${(props) => (props.sideNav ? "300px" : 0)};
	}
`;

export const Badge = styled.span`
	position: absolute;
	top: -10px;
	right: -10px;
	padding: 4px 8px;
	border-radius: 50%;
	background: #d13c3a;
	color: white;
	font-size: 14px;
`;
