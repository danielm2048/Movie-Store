import styled from "styled-components";

export const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
`;

export const List = styled.ul`
	display: flex;
	flex-wrap: wrap;
	list-style: none;
	margin: 0;
	padding: 0;
`;

export const Item = styled.li`
	display: flex;
	padding: 1rem;

	@media (min-width: 40rem) {
		width: 50%;
	}

	@media (min-width: 56rem) {
		width: 33.3333%;
	}
`;
