import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { FORGOT_PASSWORD } from "../../graphql/gqlDocs";
import {
	ModalActions,
	ModalInput,
	ModalButton,
	ModalError,
} from "../../style/styledModal";

const ForgotPassword = ({ toggleToast, setModal }) => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState(null);

	const [forgotPassword] = useMutation(FORGOT_PASSWORD);

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				try {
					const res = await forgotPassword({
						variables: {
							email,
						},
					});

					if (res && res.data) {
						setModal(false);
						toggleToast(
							"Email sent! If you can't see anything check your spam!"
						);
					}
				} catch (err) {
					setError(err.graphQLErrors[0].message);
					setEmail("");
				}
			}}
		>
			<ModalActions>
				{error ? (
					<ModalError>
						<strong>{error}</strong>
					</ModalError>
				) : null}

				<label htmlFor="email">
					<strong>Email:</strong>
				</label>
				<ModalInput
					type="text"
					value={email}
					placeholder="Enter Email"
					name="email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					required
				/>

				<ModalButton type="submit">
					Send Email{" "}
					<span role="img" aria-label="send email emoji">
						📩
					</span>
				</ModalButton>
			</ModalActions>
		</form>
	);
};

export default ForgotPassword;
