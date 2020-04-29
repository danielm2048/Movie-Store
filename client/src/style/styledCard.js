import styled from "styled-components";
import { Link } from "react-router-dom";

export const Select = styled.select`
	font-family: "Raleway", sans-serif;
`;

export const Option = styled.option``;

export const Card = styled.div`
	background-color: white;
	border-radius: 0.25rem;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	width: 20rem;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	transition: 0.3s;
	&:hover {
		box-shadow: 0 25px 40px 0 rgba(0, 0, 0, 0.4);
	}
`;

export const CardImgLink = styled(Link)`
	text-decoration: none;
	overflow: hidden;
	height: 70%;
`;

export const CardImg = styled.img`
	width: 100%;
	height: 100%;
`;

export const CardTitle = styled.h3`
	font-size: 26px;
	margin: auto;
`;

export const CardPrice = styled.h4`
	font-size: 22px;
	margin: auto;
`;

export const CardActions = styled.div`
	display: flex;
	flex-direction: row;
	align-content: flex-end;
	padding: 1rem;
`;

export const CardButton = styled.button`
	display: flex;
	margin: 0 0 0 auto;
`;
