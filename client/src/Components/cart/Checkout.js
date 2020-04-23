import React from "react";
import {
	Box,
	Row,
	Col,
	Field,
	Label,
	IconContainer,
	BuyButton,
	Price,
} from "../../style/styledCheckout";
import {
	User,
	Envelope,
	AddressCard,
	Building,
	ShoppingCart,
	ShekelSign,
} from "@styled-icons/fa-solid";
import {
	CcVisa,
	CcMastercard,
	CcDinersClub,
	CcPaypal,
} from "@styled-icons/fa-brands";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Link } from "react-router-dom";

const Checkout = ({ history }) => {
	const cart = useStoreState((state) => state.cart);
	const cartActions = useStoreActions((actions) => actions.cart);
	if (cart.count === 0)
		return (
			<h1 style={{ textAlign: "center" }}>
				Your cart is empty!! Go get some movies!
			</h1>
		);

	const onBuy = (e) => {
		e.preventDefault();

		cartActions.removeFromCart("all");
		cartActions.setThankYou(true);
		setTimeout(() => {
			cartActions.setThankYou(false);
		}, 10000);
		history.push("/thank-you");
	};

	return (
		<Row>
			<Col perc="75%">
				<Box>
					<form onSubmit={onBuy}>
						<Row>
							<Col perc="50%">
								<h3>Billing Address</h3>
								<Label htmlFor="fname">
									<User size="16" /> Full Name
								</Label>
								<Field
									type="text"
									id="fname"
									name="firstname"
									placeholder="Frodo Baggins"
									required
								></Field>

								<Label htmlFor="email">
									<Envelope size="16" /> Email
								</Label>
								<Field
									type="email"
									id="email"
									name="email"
									placeholder="frodo@ringbearer.com"
									required
								></Field>

								<Label htmlFor="adr">
									<AddressCard size="16" /> Address
								</Label>
								<Field
									type="text"
									id="adr"
									name="address"
									placeholder="Bag End"
									disabled
								></Field>

								<Label htmlFor="city">
									<Building size="16" /> City
								</Label>
								<Field
									type="text"
									id="city"
									name="city"
									placeholder="The Shire"
									disabled
								></Field>

								<Label htmlFor="zip">Zip</Label>
								<Field
									type="text"
									id="zip"
									name="zip"
									placeholder="10001"
									disabled
								></Field>
							</Col>
							<Col perc="50%">
								<h3>Payment</h3>
								<Label htmlFor="cards">Accepted Cards</Label>
								<IconContainer>
									<CcVisa size="24" color="navy" />
									<CcMastercard size="24" color="red" />
									<CcPaypal size="24" color="blue" />
									<CcDinersClub size="24" />
								</IconContainer>

								<Label htmlFor="cname">Name on Card</Label>
								<Field
									type="text"
									id="cname"
									name="cardname"
									placeholder="Frodo Baggins"
									disabled
								></Field>

								<Label htmlFor="ccnum">Credit card number</Label>
								<Field
									type="text"
									id="ccnum"
									name="cardnumber"
									placeholder="1111-2222-3333-4444"
									disabled
								></Field>

								<Label htmlFor="expdate">Exp Date</Label>
								<Field
									type="month"
									id="expdate"
									name="expdate"
									placeholder="09/22"
									disabled
								></Field>

								<Label htmlFor="cvv">CVV</Label>
								<Field
									type="text"
									id="cvv"
									name="cvv"
									placeholder="123"
									disabled
								></Field>
							</Col>
						</Row>
						<BuyButton type="submit">Continue to Checkout</BuyButton>
					</form>
				</Box>
			</Col>

			<Col perc="25%">
				<Box>
					<h4>
						Cart{" "}
						<Price color="black">
							<ShoppingCart size="18" /> <b>{cart.count}</b>
						</Price>
					</h4>
					{cart.cart.map((item) => (
						<p key={item.movieId + item.format}>
							<Link to={`/movie/${item.movieId}`}>{item.name}</Link>{" "}
							<span>{item.format}</span>
							<Price color="grey">
								<b>{item.quantity}</b>
								{" - " + item.price}
								<ShekelSign size="12" />
							</Price>
						</p>
					))}
					<hr style={{ border: "1px solid lightgrey" }} />
					<p>
						Total{" "}
						<Price color="black">
							{cart.sumPrice}
							<ShekelSign size="12" />
						</Price>
					</p>
				</Box>
			</Col>
		</Row>
	);
};

export default Checkout;
