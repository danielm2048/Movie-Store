import React from "react";
import { SideQuantity, QuantityButton } from "../../style/styledSideNav";

const NumberInput = ({ quantity, onQuantityChange, remove }) => {
	const onChange = (newQuantity) => {
		if (newQuantity === 0) {
			remove();
		} else {
			if (newQuantity > 0 && newQuantity <= 9) {
				onQuantityChange(newQuantity);
			}
		}
	};

	return (
		<div
			style={{ display: "flex", margin: "5px 25px", height: 30, width: 120 }}
		>
			<QuantityButton onClick={() => onChange(quantity - 1)}>-</QuantityButton>

			<SideQuantity
				value={quantity}
				onChange={(e) => onChange(parseInt(e.target.value))}
			/>

			<QuantityButton onClick={() => onChange(quantity + 1)}>+</QuantityButton>
		</div>
	);
};

export default NumberInput;
