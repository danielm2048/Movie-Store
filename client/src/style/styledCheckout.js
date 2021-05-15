import styled from "styled-components";

export const Box = styled.div`
	padding: 5px 20px 15px 20px;
	@media screen and (max-width: 768px) {
		padding: 0;
	}
`;

export const Row = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 10px 16px;
	@media screen and (max-width: 768px) {
		flex-direction: column-reverse;
	}
`;

export const Col = styled.div`
	flex: ${(props) => props.perc};
	padding: 0 16px;
	@media screen and (max-width: 800px) {
		margin-bottom: ${(props) => (props.perc === "25%" ? "20px" : "")};
		padding: 0;
	}
`;

export const Field = styled.input`
	width: 100%;
	margin-bottom: 20px;
	padding: 12px;
	border: 1px solid #ccc;
	border-radius: 3px;
`;

export const Label = styled.label`
	margin-bottom: 10px;
	display: block;
	font-weight: bold;
`;

export const IconContainer = styled.div`
	margin-bottom: 20px;
	padding: 7px 0;
	font-size: 24px;
`;

export const BuyButton = styled.button`
	background-color: #d13c3a;
	color: white;
	padding: 12px;
	margin: 10px 0;
	border: none;
	width: 100%;
	border-radius: 3px;
	cursor: pointer;
	font-size: 17px;
	&:hover {
		opacity: 0.9;
	}
`;

export const Price = styled.span`
	float: right;
	color: ${(props) => props.color};
`;
