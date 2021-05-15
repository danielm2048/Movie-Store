import styled from "styled-components";
import { Link } from "react-router-dom";

export const Card = styled.div`
	background-color: white;
	border-radius: 0.25rem;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	width: 20rem;
	transition: 0.3s;
	&:hover {
		transform: scale(1.08);
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
	align-items: center;
	align-content: flex-end;
	padding: 1rem;
`;

export const CardButton = styled.button`
	display: flex;
	margin: 0 0 0 15px;
	padding: 14px;
	justify-content: center;
	align-items: center;
	background-color: #262626;
	color: white;
	border-radius: 5px;
	outline: none;
	width: 50%;
	border: 2px solid transparent;
	font-size: 16px;
	font-family: "Roboto";
	cursor: pointer;
`;

export const ReviewStars = styled.div`
	width: 160px;
	margin: ${(props) => (props.margin ? props.margin : "0 auto")};

	label {
		float: right;
		position: relative;
		width: 30px;
		height: 30px;
		cursor: ${(props) => (props.persistent ? "default" : "pointer")};

		&:not(:first-of-type) {
			padding-right: 2px;
		}

		&:before {
			content: "★";
			font-size: 26px;
			color: #ccc;
			line-height: 0;
		}
	}

	input {
		display: none;
	}

	input:checked ~ label:before {
		color: #f9df4a;
	}

	&:not(:checked) > label:hover:before,
	&:not(:checked) > label:hover ~ label:before {
		color: ${(props) => (props.persistent ? "" : "#f9df4a")};
	}
`;
