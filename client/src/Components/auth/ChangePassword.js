import React, { useState } from "react";
import {
	Row,
	Col,
	Label,
	Field,
	Box,
	BuyButton,
} from "../../style/styledCheckout";
import { ModalError } from "../../style/styledModal";
import { CHANGE_PASSWORD } from "../../graphql/gqlDocs";
import { useStoreActions } from "easy-peasy";
import { useMutation } from "react-apollo";

const ChangePassword = ({ history, match }) => {
	const [password, setPassword] = useState("");
	const [passwordAgain, setPasswordAgain] = useState("");
	const [error, setError] = useState(null);

	const [changePassword] = useMutation(CHANGE_PASSWORD);

	const toastActions = useStoreActions((actions) => actions.toast);

	const toggleToast = () => {
		toastActions.setMessage("Password changed successfully 🖖");
		toastActions.setVisible(true);
		setTimeout(() => {
			toastActions.setVisible(false);
		}, 2700);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		if (password === passwordAgain) {
			try {
				const token = match.params.token;

				const res = await changePassword({
					variables: {
						token,
						password,
					},
				});

				if (res && res.data) {
					setPassword("");
					setPasswordAgain("");
					history.push("/");
					toggleToast();
				}
			} catch (err) {
				setError(err.graphQLErrors[0].message);
				setPassword("");
				setPasswordAgain("");
			}
		} else {
			setError("Passwords don't match! Check again...");
		}
	};

	return (
		<Row>
			<Col style={{ display: "flex", margin: "0 auto" }}>
				<Box>
					<h2 style={{ textAlign: "center" }}>
						Change your password, pick something good!
					</h2>

					<form onSubmit={onSubmit}>
						{error ? (
							<ModalError>
								<strong>{error}</strong>
							</ModalError>
						) : null}
						<Label htmlFor="name">Password: </Label>
						<Field
							type="password"
							id="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter new password:"
							required
						/>

						<Label htmlFor="password2">Password again: </Label>
						<Field
							type="password"
							id="password2"
							name="password2"
							value={passwordAgain}
							onChange={(e) => setPasswordAgain(e.target.value)}
							placeholder="Enter your new password again:"
							required
						/>

						<BuyButton type="submit">Change!</BuyButton>
					</form>
				</Box>
			</Col>
		</Row>
	);
};

export default ChangePassword;
