import React, { useEffect, useRef, useState } from "react";

import {
	Wrapper,
	Select,
	SelectTrigger,
	Options,
	Option,
	Arrow,
} from "../../style/styledSelect";

const SelectDropDown = ({ options, selected, setSelected }) => {
	const [open, setOpen] = useState(false);

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setOpen(false);
		}
	};

	const ref = useRef(null);
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);

	const onOptionClick = (option) => {
		setSelected(option);
		setOpen(false);
	};

	return (
		<Wrapper ref={ref}>
			<Select>
				<SelectTrigger onClick={() => setOpen(!open)}>
					<span>{selected}</span>
					<Arrow open={open} />
				</SelectTrigger>
				<Options open={open}>
					{options.map((option, i) => (
						<Option
							key={i}
							onClick={() => onOptionClick(option)}
							selected={option === selected}
						>
							{option}
						</Option>
					))}
				</Options>
			</Select>
		</Wrapper>
	);
};

export default SelectDropDown;
