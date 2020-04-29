import styled from "styled-components";

export const Main = styled.div`
	display: block;
	transition: margin-left 0.5s;
	padding: 0.1px;
	margin-left: ${(props) => (props.sideNav ? "350px" : 0)};
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
	padding-bottom: 3.5rem;
	font-family: "Raleway", sans-serif;
`;

export const About = styled.p`
	font-size: 26px;
	font-weight: 600;
	white-space: pre-line;
	margin-left: 300px;
	@media screen and (max-width: 768px) {
		margin-left: 10px;
	}
`;

export const HeaderDiv = styled.div`
	position: relative;
	padding-top: 60px;
	background-image: url(${(props) => props.url});
	background-repeat: no-repeat;
	background-size: 100% 100%;
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
`;

export const StyledFooter = styled.footer`
	position: absolute;
	height: 3rem;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	font-family: "Dancing Script", cursive;
	background-color: #48505e;
	color: white;
	text-align: center;
	vertical-align: middle;
	line-height: 3rem;
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
