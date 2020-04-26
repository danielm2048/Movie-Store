import styled from "styled-components";

export const Table = styled.table`
	border-collapse: collapse;
	border-spacing: 0;
	width: 75%;
	margin: 15px auto;
	border: 1px solid #ddd;
`;

export const TH = styled.th`
	text-align: left;
	padding: 8px;
	font-size: 24px;
`;

export const TD = styled.td`
	text-align: left;
	padding: 8px;
`;

export const TR = styled.tr`
	&:nth-child(even) {
		background: #d4f4f4;
	}
`;

export const Unwish = styled.span`
	color: #000;
	font-size: 35px;
	font-weight: bold;
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
