import React from "react";
import styled, { keyframes } from "styled-components";

import homeHeader from "./images/background1.jpg";

import { Link } from "react-router-dom";

export const Main = styled.div`
	display: block;
	transition: margin-left 0.5s;
	padding: 0.1px;
	position: relative;
	min-height: 100vh;
`;

export const Canvas = styled.div`
	height: 100%;
	width: ${(props) => (props.sideNav ? "100%" : 0)};
	position: fixed;
	z-index: 3;
	background-color: rgba(0, 0, 0, 0.9);
	overflow-y: auto;
	overflow-x: hidden;
	opacity: ${(props) => (props.sideNav ? 0.8 : 0)};
	transition: opacity 0.7s;
`;

export const Content = styled.div`
	padding-bottom: 25rem;
	font-family: "Raleway", sans-serif;
	@media screen and (max-width: 768px) {
		padding-bottom: auto;
	}
`;

export const AboutText = styled.div`
	font-family: "Gotu", sans-serif;
	width: 400px;
	font-size: 26px;
	font-weight: 500;
	white-space: pre-line;
	margin-left: 350px;
	@media screen and (max-width: 768px) {
		width: 200px;
		font-size: 16px;
		margin-left: 10px;
	}
	@media screen and (max-width: 1024px) {
		margin-left: 50px;
	}
`;

export const HeaderDiv = styled.div`
	display: ${(props) => (props.vis ? "block" : "none")};
	position: relative;
	z-index: -1;
	padding-top: 60px;
	background-image: url(${(props) => props.url});
	background-repeat: no-repeat;
	background-size: 100% 100%;
	width: 100%;
	min-height: 350px;
	color: white;
	font-family: "Gotu", sans-serif;
	transition: background-image 0.2s ease;
	@media screen and (max-width: 768px) {
		min-height: 25px;
	}
`;

export const HeaderTitle = styled.h1`
	text-align: center;
	padding: 2.5rem;
	@media screen and (max-width: 768px) {
		padding: 0 0 50px 0;
		font-size: 24px;
	}
`;

export const HeaderCredit = styled.div`
	text-align: end;
	font-size: 11px;
	position: absolute;
	bottom: 0;
	right: 0;
	@media screen and (max-width: 768px) {
		font-size: 8px;
	}
`;

export const StyledFooter = styled.footer`
	position: relative;
	height: auto;
	width: 100%;
	padding: 10px;
	font-family: "Dancing Script", cursive;
	background-color: #48505e;
	color: white;
	line-height: 2rem;
`;

export const FooterMenu = styled.nav`
	display: flex;
	justify-content: space-evenly;
`;

export const FooterMenuList = styled.ul`
	margin: 0;
	padding: 0;
	@media screen and (max-width: 768px) {
		margin: 0 2em 2em 0;
	}

	& > li {
		display: ${(props) => (props.horizontal ? "inline-block" : "block")};
	}
`;

export const FooterMenuItem = styled.li`
	margin: 0 7px 7px 0;
	padding: 0;
	list-style: none;
	font-size: 13px;
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: 1px;
`;

export const FooterMenuLink = styled(Link)`
	color: #fff;
	text-decoration: none;
	position: relative;
	padding: 10px 0;
	font-family: "Quicksand", Arial, sans-serif;
	transition: 0.3s;
	&:after {
		content: "";
		position: absolute;
		height: 1px;
		bottom: 7px;
		left: 0;
		right: 0;
		background-color: #fff;
		visibility: hidden;
		transform: scaleX(0);
		transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}
	&:hover {
		text-decoration: none;
	}
	&:hover:after {
		visibility: visible;
		transform: scaleX(1);
	}
`;

export const StyledPagination = styled.a`
	color: ${(props) => (props.active === "true" ? "white" : "black")};
	background-color: ${(props) => (props.active === "true" ? "#d13c3a" : "")};
	border-radius: 50%;
	padding: 8px 16px;
	font-size: 20px;
	text-decoration: none;
	text-align: center;
	cursor: pointer;
	transition: background-color 0.3s;
	&:hover {
		background-color: ${(props) => (props.active === "false" ? "#ddd" : "")};
	}
`;

export const HomeHeader = styled.div`
	position: absolute;
	top: 0;
	width: 100%;
	display: flex;
	height: 100vh;
	background-image: url(${homeHeader});
	background-repeat: no-repeat;
	background-size: 100% 100%;
	justify-content: flex-end;
	align-items: flex-start;

	@media screen and (max-width: 768px) {
		background-size: cover;
		background-position-x: right;
	}
`;

export const HomeTitle = styled.h1`
	margin-top: 200px;
	font-size: 3.5vw;

	@media screen and (max-width: 768px) {
		font-size: 8vw;
	}
`;

export const ShopButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	margin-right: 50px;
	@media screen and (max-width: 768px) {
		margin-right: 0;
		margin-left: 200px;
	}
`;

export const ShopButton = styled.button`
	margin-top: 150px;
	border-radius: 30px;
	border-width: 2px;
	border-color: black;
	border-style: solid;
	width: 180px;
	height: 60px;
	color: black;
	background-color: transparent;
	font-size: 22px;
	font-weight: 700;
	cursor: pointer;
	transition: background-color 0.5s, color 0.5s, border-color 0.5s;
	&:hover {
		background-color: black;
		color: white;
		border-color: white;
	}
	outline: none;
	@media screen and (max-width: 768px) {
		margin-top: 50px;
		width: 120px;
		height: 40px;
		font-size: 16px;
	}
`;

const scroll = keyframes`
	0% { opacity: 0; }
	10% { transform: translateY(0); opacity: 1; }
	100% { transform: translateY(15px); opacity: 0; }
`;

const ScrollerDiv = styled.div`
	width: 3px;
	height: 10px;
	border-radius: 25%;
	background-color: #000;
	animation: ${scroll} 1.2s cubic-bezier(0.15, 0.41, 0.69, 0.94) infinite;
`;

const MouseDiv = styled.div`
	width: 3px;
	padding: 10px 15px;
	height: 35px;
	border: 2px solid #000;
	border-radius: 25px;
	opacity: 0.75;
	box-sizing: content-box;
`;

export const Mouse = () => (
	/*mouse css from Deepak K Vijayan*/
	<MouseDiv style={{ position: "absolute", bottom: 5, left: "50%" }}>
		<ScrollerDiv />
	</MouseDiv>
);

export const VL = styled.div`
	border-left: 2px solid grey;
	height: 80px;
	@media screen and (max-width: 768px) {
		border-left: none;
		height: 0;
		border-bottom: 2px solid grey;
		width: 160px;
	}
`;

export const InfoBarContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	background-color: #e6e6e6;
	margin: 12rem 0;
	@media screen and (max-width: 768px) {
		flex-direction: column;
		margin: 3rem 0;
	}
`;

export const StyledInfoBarItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 50px;
`;

export const HomeDiv = styled.div`
	display: flex;
	@media screen and (max-width: 768px) {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 1rem 0;
	}
`;

export const HomeText = styled.p`
	font-size: 60px;
	align-self: center;
	font-weight: bold;
	word-wrap: break-word;
	white-space: pre-wrap;
	color: #d13c3a;
	margin-left: ${(props) => props.marginLeftSize};
	@media screen and (max-width: 768px) {
		margin: 0 auto;
		font-size: 20px;
	}
`;

export const HomeImg = styled.img`
	display: block;
	max-width: ${(props) => `${props.perc}%`};
	height: auto;
	@media screen and (max-width: 768px) {
		margin: 0 auto;
		padding: 0;
		max-width: calc(100vw - 30px);
	}
`;

export const NotFoundText = styled.div`
	position: absolute;
	top: 150px;
	right: 0;
	left: 0;
	@media screen and (max-width: 768px) {
		position: relative;
		top: 0px;
		margin-bottom: 40px;
		font-size: 18px;
	}
`;
