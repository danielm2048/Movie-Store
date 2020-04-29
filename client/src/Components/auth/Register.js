import React, { useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER, GET_USER } from "../../graphql/gqlDocs";
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
import { NavItem, StyledNavLink, NavLinkHover } from "../../style/styledNavbar";
import { UserPlus } from "@styled-icons/fa-solid";
import { useStoreActions } from "easy-peasy";

const Register = () => {
	const setAccessToken = useStoreActions(
		(actions) => actions.user.setAccessToken
	);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [modal, setModal] = useState("");
	const [error, setError] = useState(null);

	const [signup] = useMutation(REGISTER);

	const toggle = () => {
		setModal(false);
		setEmail("");
		setPassword("");
		setUsername("");
		setError(null);
	};

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setModal(false);
			setEmail("");
			setPassword("");
			setUsername("");
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
					<NavLinkHover>
						<UserPlus size="16" title="Register" />
					</NavLinkHover>
				</StyledNavLink>
			</NavItem>
			<Modal modal={modal}>
				<ModalContent
					ref={ref}
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
							}
						} catch (err) {
							setError(err.graphQLErrors[0].message);
							setEmail("");
							setPassword("");
							setUsername("");
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
				</ModalContent>
			</Modal>
		</>
	);
};

export default Register;
