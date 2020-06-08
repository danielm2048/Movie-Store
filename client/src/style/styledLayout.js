import React from "react";
import styled, { keyframes } from "styled-components";

import homeHeader from "./images/homeH-min.jpg";

import { ShippingFast, CreditCard } from "@styled-icons/fa-solid";
import { OldPhone, PriceTag } from "@styled-icons/entypo";
import { Link } from "react-router-dom";

export const Main = styled.div`
	display: block;
	transition: margin-left 0.5s;
	padding: 0.1px;
	/* margin-left: ${(props) => (props.sideNav ? "350px" : 0)}; */
	position: relative;
	min-height: 100vh;
`;

export const Canvas = styled.div`
	height: 100%;
	width: ${(props) => (props.sideNav ? "100%" : 0)};
	position: fixed;
	z-index: 3;
	/* top: 0;
	left: 0; */
	background-color: rgba(0, 0, 0, 0.9);
	overflow-y: auto;
	overflow-x: hidden;
	opacity: ${(props) => (props.sideNav ? 0.8 : 0)};
	transition: opacity 0.7s;
`;

export const Content = styled.div`
	padding-bottom: 20rem;
	font-family: "Raleway", sans-serif;
	@media screen and (max-width: 768px) {
		padding-bottom: auto;
	}
`;

export const AboutText = styled.p`
	font-size: 26px;
	font-weight: 600;
	white-space: pre-line;
	margin-left: 300px;
	@media screen and (max-width: 768px) {
		margin-left: 10px;
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
	position: absolute;
	height: auto;
	/* left: 0;
	right: 0; */
	bottom: 0;
	width: 100%;
	padding: 10px;
	font-family: "Dancing Script", cursive;
	background-color: #48505e;
	color: white;
	/* text-align: center;
	vertical-align: middle; */
	line-height: 2rem;
	/* @media screen and (max-width: 768px) {
		height: auto;
	} */
`;

export const FooterMenu = styled.nav`
	display: flex;
	justify-content: space-evenly;
	/* width: 100%; */
`;

export const FooterMenuList = styled.ul`
	/* text-align: center; */
	margin: 0;
	padding: 0;
	@media screen and (max-width: 768px) {
		margin: 0 0 2em 0;
	}
`;

export const FooterMenuItem = styled.li`
	margin: 0 0 7px 0;
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
		/* color: black; */
	}
	&:hover:after {
		visibility: visible;
		transform: scaleX(1);
	}
`;

export const StyledPagination = styled.a`
	color: ${(props) => (props.active === "true" ? "white" : "black")};
	background-color: ${(props) => (props.active === "true" ? "dodgerblue" : "")};
	padding: 8px 16px;
	font-size: 20px;
	text-decoration: none;
	cursor: pointer;
	transition: background-color 0.3s;
	&:hover {
		background-color: ${(props) => (props.active === "false" ? "#ddd" : "")};
	}
`;

export const HomeHeader = styled.div`
	position: relative;
	display: flex;
	/* border-radius: 0 0 85% 85% / 30%; */
	height: 88.5vh;
	background-image: url(${homeHeader});
	background-repeat: no-repeat;
	background-size: 100% 100%;
	justify-content: flex-end;
	align-items: flex-start;
`;

export const HomeTitle = styled.h1`
	margin-top: 200px;
	font-size: 4vw;
`;

export const ShopButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	margin-right: 100px;
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

const VL = styled.div`
	border-left: 2px solid grey;
	height: 80px;
	@media screen and (max-width: 768px) {
		border-left: none;
		height: 0;
		border-bottom: 2px solid grey;
		width: 160px;
	}
`;

const InfoBarContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	background-color: #333;
	margin: 12rem 0;
	@media screen and (max-width: 768px) {
		flex-direction: column;
		margin: 3rem 0;
	}
`;

const StyledInfoBarItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: white;
	padding: 50px;
`;

const InfoBarItem = ({ icon, header, desc }) => (
	<StyledInfoBarItem>
		{icon}
		<h3 style={{ fontWeight: "bold" }}>{header}</h3>
		<br />
		<p>{desc}</p>
	</StyledInfoBarItem>
);

export const InfoBar = () => (
	<InfoBarContainer>
		<InfoBarItem
			icon={<ShippingFast />}
			header="Fast Shipping"
			desc="Your order will be recieved in 3-7 business days!"
		/>
		<VL />
		<InfoBarItem
			icon={<OldPhone size="42" />}
			header="Customer Service"
			desc="Our great phone and online support is here for you 24/7 :)"
		/>
		<VL />
		<InfoBarItem
			icon={<PriceTag />}
			header="Fair Prices"
			desc="If you find a better price tell us and we'll match it."
		/>
		<VL />
		<InfoBarItem
			icon={<CreditCard />}
			header="Secure Payment"
			desc="Your purchases here are safe and secure!"
		/>
	</InfoBarContainer>
);

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
	color: tomato;
	margin-left: ${(props) => props.marginLeftSize};
	@media screen and (max-width: 768px) {
		margin: 0 auto;
		font-size: 20px;
	}
`;

export const HomeImg = styled.img`
	max-width: ${(props) => `${props.perc}%`};
	height: auto;
	@media screen and (max-width: 768px) {
		margin: 0 auto;
		max-width: 90%;
	}
`;
