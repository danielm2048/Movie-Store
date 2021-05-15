import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER, GET_USER } from "../../graphql/gqlDocs";
import {
	ModalActions,
	ModalInput,
	ModalButton,
	ModalError,
} from "../../style/styledModal";
import { useStoreActions } from "easy-peasy";

const Register = ({ toggleToast }) => {
	const setAccessToken = useStoreActions(
		(actions) => actions.user.setAccessToken
	);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [error, setError] = useState(null);

	const [signup] = useMutation(REGISTER);

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				try {
					const res = await signup({
						variables: {
							username,
							email,
							password,
						},
						update: (store, { data }) => {
							if (!data) {
								return null;
							}
							store.writeQuery({
								query: GET_USER,
								data: { getUser: data.signupUser.user },
							});
						},
					});

					if (res && res.data) {
						setAccessToken(res.data.signupUser.accessToken);
						toggleToast("Registerd successfully 🤟");
					}
				} catch (err) {
					setError(err.graphQLErrors[0].message);
					setEmail("");
					setPassword("");
					setUsername("");
				}
			}}
		>
			<ModalActions>
				{error ? (
					<ModalError>
						<strong>{error}</strong>
					</ModalError>
				) : null}

				<label htmlFor="username">
					<strong>Username:</strong>
				</label>
				<ModalInput
					type="text"
					value={username}
					placeholder="Enter Username"
					name="name"
					onChange={(e) => {
						setUsername(e.target.value);
					}}
					required
				/>

				<label htmlFor="email">
					<strong>Email:</strong>
				</label>
				<ModalInput
					type="email"
					value={email}
					placeholder="Enter Email"
					name="email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					required
				/>

				<label htmlFor="password">
					<strong>Password:</strong>
				</label>
				<ModalInput
					type="password"
					value={password}
					placeholder="Enter Password"
					name="password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					required
				/>

				<ModalButton type="submit">Register</ModalButton>
			</ModalActions>
		</form>
	);
};

export default Register;
