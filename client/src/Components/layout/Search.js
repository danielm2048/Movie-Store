import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import {
	AutoComplete,
	AnimatedSearch,
	AutoCompleteItemList,
	AutoCompleteItem,
} from "../../style/styledNavbar";
import { useQuery } from "react-apollo";
import { GET_MOVIES } from "../../graphql/gqlDocs";
import { withRouter } from "react-router-dom";

import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const Search = ({ history }) => {
	const { data, loading } = useQuery(GET_MOVIES);

	const [focus, setFocus] = useState(false);
	const [active, setActive] = useState(-1);

	const searchInput = useStoreState((state) => state.search.input);
	const setInput = useStoreActions((actions) => actions.search.setInput);

	const onInputChange = (e) => {
		setInput(e.target.value);
	};

	const onFocusChange = () => {
		setFocus(true);
	};

	const onBlurChange = () => {
		setFocus(false);
		setActive(-1);
	};

	const onItemClick = (id) => {
		setInput("");
		history.push(`/movie/${id}`);
	};

	const onKeyDown = (e) => {
		if (e.keyCode === 40 && active <= searchItems.length) {
			setActive(active === searchItems.length - 1 ? 0 : active + 1);
		} else if (e.keyCode === 38 && active >= -1) {
			setActive(active === -1 ? searchItems.length - 1 : active - 1);
		} else if (e.keyCode === 13) {
			if (active > -1) {
				e.preventDefault();
				searchItems[active].props.onMouseDown(searchItems[active].id);
			}
		}
	};

	const applyBoldStyle = (text, bold) => {
		const reg1 = new RegExp("(" + bold + ")", "gi");
		const res = text.replace(reg1, "<strong>$1</strong>");
		return DOMPurify.sanitize(res);
	};

	useEffect(() => {
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
		};
	});

	let searchItems = [];

	if (loading && focus) {
		searchItems.push(
			<AutoCompleteItem key={0}>
				<div className="lds-ellipsis" style={{ marginLeft: 15 }}>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</AutoCompleteItem>
		);
	} else if (history.location.pathname === "/movies") {
		searchItems = [];
	} else if (searchInput !== "" && focus) {
		searchItems = data.getMovies.reduce((accu, curr) => {
			if (
				curr.name
					.toLowerCase()
					.replace(":", "")
					.includes(searchInput.toLowerCase().replace(":", "")) &&
				accu.length <= 9
			) {
				accu.push(
					<AutoCompleteItem
						key={accu.length}
						id={curr.id}
						onMouseDown={() => onItemClick(curr.id)}
						dangerouslySetInnerHTML={{
							__html: applyBoldStyle(curr.name, searchInput),
						}}
						active={accu.length === active}
					/>
				);
			}
			return accu;
		}, []);
	}

	return (
		<AutoComplete>
			<AnimatedSearch
				autoComplete="off"
				type="text"
				name="search"
				placeholder="Search..."
				value={searchInput}
				onChange={onInputChange}
				onFocus={onFocusChange}
				onBlur={onBlurChange}
			/>
			<AutoCompleteItemList onClick={onItemClick}>
				{searchItems}
			</AutoCompleteItemList>
		</AutoComplete>
	);
};

export default withRouter(Search);
