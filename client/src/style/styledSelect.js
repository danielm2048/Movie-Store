import styled from "styled-components";

export const Wrapper = styled.div`
	position: relative;
	user-select: none;
	width: 70%;
	margin: 1rem auto;
	font-family: "Raleway", sans-serif;
`;

export const Select = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	border-width: 0 2px 0 2px;
	border-style: solid;
	border-color: #394a6d;
`;

export const SelectTrigger = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 22px;
	font-size: 20px;
	font-weight: 300;
	color: #3b3b3b;
	height: 50px;
	line-height: 60px;
	background: #ffffff;
	cursor: pointer;
	border-width: 2px 0 2px 0;
	border-style: solid;
	border-color: #394a6d;
`;

export const Options = styled.div`
	position: absolute;
	display: block;
	top: 100%;
	left: 0;
	right: 0;
	border: 2px solid #394a6d;
	border-top: 0;
	background: #fff;
	transition: all 0.5s;
	opacity: ${(props) => (props.open ? 1 : 0)};
	visibility: ${(props) => (props.open ? "visible" : "hidden")};
	pointer-events: ${(props) => (props.open ? "all" : "none")};
	z-index: 2;
`;

export const Option = styled.span`
	position: relative;
	display: block;
	padding: 0 22px 0 22px;
	font-size: 22px;
	font-weight: 300;
	color: ${(props) => (props.selected ? "#ffffff" : "#3b3b3b")};
	background-color: ${(props) => (props.selected ? "#305c91" : "none")};
	line-height: 60px;
	cursor: pointer;
	transition: all 0.5s;

	&:hover {
		cursor: pointer;
		background-color: #b2b2b2;
	}
`;

export const Arrow = styled.div`
	position: relative;
	height: 15px;
	width: 15px;
	&::before,
	&::after {
		content: "";
		position: absolute;
		bottom: 0px;
		width: 0.15rem;
		height: 100%;
		transition: all 0.5s;
	}
	&::before {
		left: -5px;
		transform: ${(props) => (props.open ? "rotate(-45deg)" : "rotate(45deg)")};
		background-color: #394a6d;
	}
	&::after {
		left: 5px;
		transform: ${(props) => (props.open ? "rotate(45deg)" : "rotate(-45deg)")};
		background-color: #394a6d;
	}
`;
