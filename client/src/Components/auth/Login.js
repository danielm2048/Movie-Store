import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN, GET_USER } from "../../graphql/gqlDocs";
import {
	ModalActions,
	ModalInput,
	ModalButton,
	ModalError,
} from "../../style/styledModal";
import { useStoreActions } from "easy-peasy";

const Login = ({ toggleToast }) => {
	const setAccessToken = useStoreActions(
		(actions) => actions.user.setAccessToken
	);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const [login] = useMutation(LOGIN);

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				try {
					const res = await login({
						variables: {
							email,
							password,
						},
						update: (store, { data }) => {
							if (!data) {
								return null;
							}
							store.writeQuery({
								query: GET_USER,
								data: { getUser: data.loginUser.user },
							});
						},
					});

					if (res && res.data) {
						setAccessToken(res.data.loginUser.accessToken);
						toggleToast("Logged in successfully 👍");
					}
				} catch (err) {
					setError(err.graphQLErrors[0].message);
					setEmail("");
					setPassword("");
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

				<ModalButton type="submit">Login</ModalButton>
			</ModalActions>
		</form>
	);
};

export default Login;
