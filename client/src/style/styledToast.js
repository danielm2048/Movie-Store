import styled, { keyframes } from "styled-components";

const fadein = keyframes`
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
`;

const fadeout = keyframes`
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
`;

export const Toast = styled.div`
	display: ${(props) => (props.clicked ? "block" : "none")};
	min-width: 250px;
	margin-left: -125px;
	background-color: #333;
	color: #fff;
	text-align: center;
	border-radius: 2px;
	padding: 16px;
	position: fixed;
	z-index: 1;
	left: 50%;
	bottom: 30px;
	font-size: 17px;
	-webkit-animation: ${fadein} 0.5s, ${fadeout} 0.5s 2.5s;
	animation: ${fadein} 0.5s, ${fadeout} 0.5s 2.5s;
`;
