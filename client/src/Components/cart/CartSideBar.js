import React from "react";
import {
	SideNav,
	SideItem,
	SideLink,
	Remove,
	SidePrice,
	SideQuantity,
	SideNavTrigger,
	Badge,
	SideNavTitle,
} from "../../style/styledSideNav";
import { Close } from "../../style/styledModal";
import { CartArrowDown, ShekelSign } from "@styled-icons/fa-solid";
import { useStoreState, useStoreActions } from "easy-peasy";

const CartItem = ({ id, name, format, price, quantity }) => {
	const setQuantity = useStoreActions((actions) => actions.cart.addToCart);
	const remove = useStoreActions((actions) => actions.cart.removeFromCart);
	const onQuantityChange = (e) => {
		setQuantity({
			movieId: id,
			name,
			format,
			price,
			quantity: parseInt(e.target.value),
		});
	};
	return (
		<SideItem>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<SideLink to={`/movie/${id}`}>{name}</SideLink>
				<span style={{ marginLeft: "5px", fontSize: "12px" }}>{format}</span>
			</div>
			<SideQuantity
				type="number"
				id="quantity"
				name="quantity"
				min="1"
				max="9"
				onKeyDown={(e) => e.preventDefault()}
				value={quantity}
				onChange={onQuantityChange}
			/>
			<Remove onClick={() => remove({ movieId: id, format })}>&times;</Remove>
			<SidePrice>{price * quantity}</SidePrice>
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
				<CartArrowDown size="20" />
			</SideNavTrigger>
			<SideNav sideNav={sideNav}>
				<SideNavTitle>My Cart:</SideNavTitle>
				<Close onClick={trigger} title="Close">
					&times;
				</Close>
				<hr />
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
				<hr style={{ marginTop: "120%" }} />
				<SidePrice style={{ margin: "auto", justifyContent: "center" }}>
					<strong>
						{cart.sumPrice}
						<ShekelSign size="16" />
					</strong>
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
			</SideNav>
		</>
	);
};

export default CartSideBar;
