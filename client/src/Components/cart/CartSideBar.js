import React from "react";
import {
	SideNav,
	SideItem,
	SideLink,
	SidePrice,
	SideNavTrigger,
	Badge,
	SideNavTitle,
} from "../../style/styledSideNav";
import { Close } from "../../style/styledModal";
import { ShoppingBag } from "@styled-icons/evaicons-solid";
import { useStoreState, useStoreActions } from "easy-peasy";
import NumberInput from "./NumberInput";

const CartItem = ({ id, name, format, price, quantity }) => {
	const setQuantity = useStoreActions((actions) => actions.cart.addToCart);
	const remove = useStoreActions((actions) => actions.cart.removeFromCart);
	const onQuantityChange = (newQuantity) => {
		setQuantity({
			movieId: id,
			name,
			format,
			price,
			quantity: newQuantity,
		});
	};
	return (
		<SideItem>
			<div style={{ display: "flex", flexDirection: "column", width: "30%" }}>
				<SideLink to={`/movie/${id}`} style={{ fontSize: 14 }}>
					{name}
				</SideLink>
				<span style={{ marginLeft: 5 }}>{format}</span>
			</div>
			<NumberInput
				quantity={quantity}
				onQuantityChange={onQuantityChange}
				remove={() => remove({ movieId: id, format })}
			/>
			<SidePrice>{price * quantity}₪</SidePrice>
		</SideItem>
	);
};

const CartSideBar = () => {
	const cart = useStoreState((state) => state.cart);
	const sideNav = useStoreState((state) => state.layout.sideNav);
	const setSideNav = useStoreActions((actions) => actions.layout.setSideNav);
	const removeFromCart = useStoreActions(
		(actions) => actions.cart.removeFromCart
	);

	const trigger = () => {
		setSideNav(!sideNav);
	};

	return (
		<>
			<SideNavTrigger onClick={trigger} sideNav={sideNav}>
				<Badge>{cart.count}</Badge>
				<ShoppingBag size="24" />
			</SideNavTrigger>
			<SideNav sideNav={sideNav}>
				<SideNavTitle>My Cart:</SideNavTitle>
				<Close onClick={trigger} title="Close">
					&times;
				</Close>
				<hr />
				{cart.cart.length === 0 ? (
					<span style={{ marginLeft: "25px", fontSize: "16px" }}>
						Your cart is empty...
					</span>
				) : (
					<>
						<div style={{ height: 700, overflow: "auto" }}>
							{cart.cart.map((item) => (
								<CartItem
									key={item.movieId + item.format}
									id={item.movieId}
									name={item.name}
									format={item.format}
									price={item.price}
									quantity={item.quantity}
								/>
							))}
						</div>
						<div style={{ bottom: "calc(-100% + 900px)" }}>
							<hr />
							<SidePrice style={{ display: "flex", justifyContent: "center" }}>
								<strong>{cart.sumPrice}₪</strong>
							</SidePrice>
							<SideLink
								to="/checkout"
								style={{ textAlign: "center", margin: "5% 0" }}
								onClick={trigger}
							>
								Go to Checkout
							</SideLink>
							<SideLink
								to="#"
								style={{ textAlign: "center" }}
								onClick={() => removeFromCart("all")}
							>
								Remove All Items
							</SideLink>
						</div>
					</>
				)}
			</SideNav>
		</>
	);
};

export default CartSideBar;
