import styled from "styled-components";

export const Unwish = styled.span`
	&:hover,
	&:focus {
		color: red;
		cursor: pointer;
	}
`;

export const Warning = styled.h1`
	color: #000;
	font-size: 35px;
	font-weight: bold;
	text-align: center;
`;

export const Container = styled.div`
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 150px;
	padding-left: 10px;
	padding-right: 10px;
`;

export const ResponsiveTable = styled.ul`
	li {
		border-radius: 3px;
		padding: 25px 30px;
		display: flex;
		justify-content: space-between;
		margin-bottom: 25px;
	}

	@media all and (max-width: 767px) {
		li {
			display: block;
		}
	}
`;

export const TableHeader = styled.li`
	background-color: #3b587a;
	color: white;
	font-size: 22px;
	font-weight: 600;
	letter-spacing: 0.03em;

	@media all and (max-width: 767px) {
		display: none;
	}
`;

export const TableRow = styled.li`
	background-color: #ffffff;
	font-size: 20px;
	box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
`;

export const Column = styled.div`
	flex-basis: ${(props) => props.col};

	@media all and (max-width: 767px) {
		flex-basis: 100%;
		display: flex;
		padding: 10px 0;
		&:before {
			color: #6c7a89;
			padding-right: 10px;
			content: attr(data-label);
			flex-basis: 50%;
			text-align: right;
		}
	}
`;
