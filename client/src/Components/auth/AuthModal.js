import React, { useState, useRef, useEffect } from "react";
import {
	Modal,
	ModalContent,
	ModalImg,
	ModalImgContainer,
	Close,
	TextButton,
} from "../../style/styledModal";
import { UserIcon } from "../../style/styledIcons";
import { NavItem, StyledNavLink } from "../../style/styledNavbar";
import logo from "../../style/images/newLogo.png";
import Login from "./Login";
import Register from "./Register";
import { useStoreActions } from "easy-peasy";
import ForgotPassword from "./ForgotPassword";

const AuthModal = () => {
	const toastActions = useStoreActions((actions) => actions.toast);

	const [modal, setModal] = useState(false);
	const [alreadyUser, setAlreadyUser] = useState(true);
	const [forgot, setForgot] = useState(false);

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setForgot(false);
			setModal(false);
		}
	};

	const ref = useRef(null);
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);

	const toggleToast = (message) => {
		toastActions.setMessage(message);
		toastActions.setVisible(true);
		setTimeout(() => {
			toastActions.setVisible(false);
		}, 2700);
	};

	const handleClick = () => {
		setAlreadyUser((prevState) => !prevState);
	};

	return (
		<>
			<NavItem right>
				<StyledNavLink
					onClick={(e) => {
						e.preventDefault();

						setModal(true);
					}}
					to="#"
					$icon
				>
					<UserIcon size="24" title="Login" />
				</StyledNavLink>
			</NavItem>

			<Modal modal={modal}>
				<ModalContent ref={ref}>
					<ModalImgContainer>
						<Close onClick={() => setModal(false)} title="Close">
							&times;
						</Close>
						<ModalImg src={logo} alt="logo" />
					</ModalImgContainer>

					{!forgot && (
						<TextButton onClick={handleClick}>
							{alreadyUser
								? "Don't have an account? Click here to register"
								: "Have an account? Click here to login"}
						</TextButton>
					)}

					{forgot ? (
						<ForgotPassword toggleToast={toggleToast} setModal={setModal} />
					) : alreadyUser ? (
						<Login toggleToast={toggleToast} />
					) : (
						<Register toggleToast={toggleToast} />
					)}

					{!forgot && (
						<TextButton onClick={() => setForgot(true)}>
							Forgot password?
						</TextButton>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default AuthModal;
