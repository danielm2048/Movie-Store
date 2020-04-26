import React, { useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN, GET_USER } from "../../graphql/gqlDocs";
import {
	Modal,
	ModalContent,
	ModalImg,
	ModalActions,
	ModalInput,
	ModalButton,
	ModalImgContainer,
	Close,
	ModalError,
} from "../../style/styledModal";
import { NavItem, StyledNavLink } from "../../style/styledNavbar";
import { SignInAlt } from "@styled-icons/fa-solid";
import { useStoreActions } from "easy-peasy";

const Login = () => {
	const setAccessToken = useStoreActions(
		(actions) => actions.user.setAccessToken
	);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [modal, setModal] = useState(false);
	const [error, setError] = useState(null);

	const [login] = useMutation(LOGIN);

	const toggle = () => {
		setModal(false);
		setEmail("");
		setPassword("");
		setError(null);
	};

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setModal(false);
			setEmail("");
			setPassword("");
			setError(null);
		}
	};

	const ref = useRef(null);
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);

	return (
		<>
			<NavItem right>
				<StyledNavLink onClick={() => setModal(true)} to="#">
					<SignInAlt size="16" title="Login" />
				</StyledNavLink>
			</NavItem>
			<Modal modal={modal}>
				<ModalContent
					ref={ref}
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
							}
						} catch (err) {
							setError(err.graphQLErrors[0].message);
							setEmail("");
							setPassword("");
						}
					}}
				>
					<ModalImgContainer>
						<Close onClick={toggle} title="Close">
							&times;
						</Close>
						<ModalImg src="/images/popcorn.png" alt="popcorn" />
					</ModalImgContainer>
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
				</ModalContent>
			</Modal>
		</>
	);
};

export default Login;
