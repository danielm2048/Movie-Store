import styled, { keyframes } from "styled-components";

export const MoviePageContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	border-radius: 5px;
	background-color: #f2f2f2;
	padding: 10px;
`;

export const MoviePageRow = styled.div`
	&:after {
		content: "";
		display: table;
		clear: both;
	}
`;

export const MoviePageColumn = styled.div`
	float: left;
	width: 50%;
	margin-top: 6px;
	padding: 20px;
	@media screen and (max-width: 768px) {
		width: 100%;
		margin-top: 0;
	}
`;

export const MoviePageTitle = styled.div`
	text-align: center;
	font-size: 38px;
	margin-top: 6px;
	margin-bottom: 16px;
`;

export const MovieImg = styled.img`
	width: 100%;
	max-width: 400px;
	height: auto;
	margin-top: 15px;
	border-radius: 15px;
`;

export const MovieDetail = styled.div`
	width: 100%;
	padding: 12px;
	border: 1px solid #ccc;
	margin-top: 6px;
	margin-bottom: 16px;
	resize: vertical;
`;

const slideRight = keyframes`
	to {
		transform:translateX(0);
	}
`;

export const MovieWarning = styled.div`
	/* visibility: ${(props) => (props.isLow ? "visible" : "hidden")}; */
	display: ${(props) => (props.isLow ? "block" : "none")};
	width: 100%;
	overflow: hidden;
	animation: ${slideRight} 2s forwards;
	transform:translateX(-100%);
`;
