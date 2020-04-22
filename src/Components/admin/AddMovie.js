import React, { useState, useRef, useEffect, useReducer } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_MOVIE } from "../../graphql/gqlDocs";
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
	AdminButton,
	ModalTextArea,
} from "../../style/styledModal";
import { Row, Col } from "../../style/styledCheckout";

const AddMovie = () => {
	const initialState = {
		name: "",
		releaseDate: "",
		desc: "",
		director: "",
		cast: [],
		genre: "",
		runtime: 0,
		language: "",
		avail: [],
		cover: "",
	};

	const reducer = (state, { name, value }) => ({
		...state,
		[name]: value,
	});

	const [state, dispatch] = useReducer(reducer, initialState);

	const onChange = (e) => {
		dispatch({ name: e.target.name, value: e.target.value });
	};

	const [modal, setModal] = useState(false);
	const [error, setError] = useState(null);

	const [add] = useMutation(ADD_MOVIE);

	const toggle = () => {
		setModal(false);
		setError(null);
	};

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setModal(false);
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
			<AdminButton onClick={() => setModal(true)}>Add a Movie</AdminButton>

			<Modal modal={modal}>
				<ModalContent
					ref={ref}
					onSubmit={async (e) => {
						e.preventDefault();

						try {
							await add({
								variables: {
									...state,
								},
							});
						} catch (err) {
							setError(err.graphQLErrors[0].message);
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

						<Row>
							<Col perc="50%">
								<label htmlFor="email">
									<strong>Name:</strong>
								</label>
								<ModalInput
									type="text"
									value={state.name}
									placeholder="Enter name"
									name="name"
									onChange={onChange}
									required
								/>

								<label htmlFor="releaseDate">
									<strong>Year of Release:</strong>
								</label>
								<ModalInput
									type="text"
									value={state.releaseDate}
									placeholder="Enter Year"
									name="releaseDate"
									onChange={onChange}
									required
								/>

								<label htmlFor="description">
									<strong>Description:</strong>
								</label>
								<ModalTextArea
									value={state.description}
									placeholder="Enter Description"
									name="description"
									onChange={onChange}
									required
								/>

								<label htmlFor="director">
									<strong>Director:</strong>
								</label>
								<ModalInput
									type="text"
									value={state.director}
									placeholder="Enter Director"
									name="director"
									onChange={onChange}
									required
								/>

								<label htmlFor="cast">
									<strong>Cast:</strong>
								</label>
								<ModalInput
									type="text"
									value={state.cast}
									placeholder="Enter Cast"
									name="cast"
									onChange={onChange}
									required
								/>
							</Col>

							<Col perc="50%">
								<label htmlFor="genre">
									<strong>Genre:</strong>
								</label>
								<ModalInput
									type="text"
									value={state.genre}
									placeholder="Enter Genre"
									name="genre"
									onChange={onChange}
									required
								/>

								<label htmlFor="runtime">
									<strong>Runtime:</strong>
								</label>
								<ModalInput
									type="number"
									value={state.runtime}
									placeholder="Enter Runtime"
									name="runtime"
									onChange={onChange}
									required
								/>

								<label htmlFor="language">
									<strong>Language:</strong>
								</label>
								<ModalInput
									type="text"
									value={state.language}
									placeholder="Enter Language"
									name="language"
									onChange={onChange}
									required
								/>

								<label htmlFor="avail">
									<strong>Available In:</strong>
								</label>
								<ModalInput
									type="text"
									value={state.avail}
									placeholder="Enter Avail"
									name="avail"
									onChange={onChange}
									required
								/>

								<label htmlFor="cover">
									<strong>Cover:</strong>
								</label>
								<ModalInput
									type="text"
									value={state.cover}
									placeholder="Enter Cover, use bit.ly"
									name="cover"
									onChange={onChange}
									required
								/>
							</Col>
						</Row>
						<ModalButton type="submit">Add a Movie</ModalButton>
					</ModalActions>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AddMovie;
