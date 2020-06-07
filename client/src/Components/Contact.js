import React, { useState } from "react";
import {
	Row,
	Col,
	Label,
	Field,
	Box,
	BuyButton,
} from "../style/styledCheckout";
import { useQuery } from "react-apollo";
import { GET_USER } from "../graphql/gqlDocs";
import { useStoreActions } from "easy-peasy";

const Contact = () => {
	const { data, loading } = useQuery(GET_USER);

	// eslint-disable-next-line
	const [name, setName] = useState("");
	// eslint-disable-next-line
	const [email, setEmail] = useState("");
	const [mess, setMess] = useState("");

	const toastActions = useStoreActions((actions) => actions.toast);

	const toggleToast = () => {
		toastActions.setMessage("Message sent! 📨");
		toastActions.setVisible(true);
		setTimeout(() => {
			toastActions.setVisible(false);
		}, 2700);
	};

	const onContact = (e) => {
		e.preventDefault();

		setName("");
		setEmail("");
		setMess("");
		toggleToast();
	};

	if (loading) {
		return (
			<div className="lds-ellipsis-container">
				<div className="lds-ellipsis">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		);
	}

	const guestFields = (
		<>
			<Label htmlFor="name">Name: </Label>
			<Field
				type="text"
				id="name"
				name="name"
				onChange={(e) => setName(e.target.value)}
				placeholder="Enter your name:"
				required
			/>
			<Label htmlFor="email">Email: </Label>
			<Field
				type="text"
				id="email"
				name="email"
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Enter your email:"
				required
			/>
		</>
	);

	return (
		<Row>
			<Col style={{ display: "flex", margin: "0 auto" }}>
				<Box>
					<h2>Tell us anything! We would love to hear from you:</h2>
					<br />
					<form onSubmit={onContact}>
						{!data.getUser ? guestFields : null}
						<Label htmlFor="mess">Message</Label>

						<textarea
							id="mess"
							placeholder="Leave us a message..."
							value={mess}
							onChange={(e) => setMess(e.target.value)}
							required
							rows="5"
							style={{ width: "100%" }}
						/>

						<BuyButton type="submit">Send Message</BuyButton>
					</form>
				</Box>
			</Col>
		</Row>
	);
};

export default Contact;
