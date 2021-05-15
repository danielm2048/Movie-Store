import React, { useState, useRef, useEffect, useCallback } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_USER, GET_MOVIE, REVIEW_MOVIE } from "../../graphql/gqlDocs";
import {
	Modal,
	ModalContent,
	ModalImgContainer,
	Close,
	ModalActions,
	ModalError,
	ModalButton,
	ModalTextArea,
	ModalImg,
} from "../../style/styledModal";
import { useStoreActions, useStoreState } from "easy-peasy";
import MovieRating from "./MovieRating";
import logo from "../../style/images/newLogo.png";

const ReviewModal = () => {
	const { data: userData, loading: loadingUser } = useQuery(GET_USER);

	const { modal, movieId } = useStoreState((state) => state.reviewModal);
	const { setModal } = useStoreActions((actions) => actions.reviewModal);
	const toastActions = useStoreActions((actions) => actions.toast);

	const [text, setText] = useState("");
	const [rating, setRating] = useState(0);
	const [isUpdate, setIsUpdate] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!loadingUser && userData.getUser) {
			const reviewForUpdate = userData.getUser.reviews.find(
				(rev) => rev.movie.id === movieId
			);
			if (reviewForUpdate) {
				setText(reviewForUpdate.text);
				setRating(reviewForUpdate.rating);
				setIsUpdate({
					text: reviewForUpdate.text,
					rating: reviewForUpdate.rating,
				});
			} else {
				setText("");
				setRating(0);
				setIsUpdate(null);
			}
		}
	}, [loadingUser, userData, movieId]);

	const [review] = useMutation(REVIEW_MOVIE);

	const handleRatingChange = (event) => {
		setRating(parseInt(event.target.value));
	};

	const handleClickOutside = useCallback(
		(event) => {
			if (ref.current && !ref.current.contains(event.target) && modal) {
				setModal(false);
				setText(isUpdate ? isUpdate.text : "");
				setRating(isUpdate ? isUpdate.rating : 0);
			}
		},
		[setModal, modal, isUpdate]
	);

	const ref = useRef(null);
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, handleClickOutside]);

	const toggleToast = (message) => {
		toastActions.setMessage(message);
		toastActions.setVisible(true);
		setTimeout(() => {
			toastActions.setVisible(false);
		}, 2700);
	};

	if (loadingUser || !userData || !movieId) {
		return null;
	}

	return (
		<Modal modal={modal}>
			<ModalContent ref={ref}>
				<ModalImgContainer>
					<Close onClick={() => setModal(false)} title="Close">
						&times;
					</Close>
					<ModalImg src={logo} alt="logo" />
				</ModalImgContainer>

				<form
					onSubmit={async (e) => {
						e.preventDefault();

						if (!rating) {
							setError("Rate the movie before submitting!");
							return false;
						}

						try {
							await review({
								variables: {
									movieId,
									text,
									rating,
								},
								refetchQueries: [
									{ query: GET_USER },
									{
										query: GET_MOVIE,
										variables: {
											movieId,
										},
									},
								],
							});
							setModal(false);
							toggleToast("Movie reviewd! 📽️");
						} catch (err) {
							console.log(err);
							setError(err.graphQLErrors[0].message);
							setText("");
							setRating(0);
						}
					}}
				>
					<ModalActions>
						{error ? (
							<ModalError>
								<strong>{error}</strong>
							</ModalError>
						) : null}

						<MovieRating
							movieId={movieId}
							rating={rating}
							margin="0"
							setRating={handleRatingChange}
						/>

						<label htmlFor="text">
							<strong>Text:</strong>
						</label>
						<ModalTextArea
							value={text}
							placeholder="Start your review here... 🖋️"
							name="text"
							onChange={(e) => {
								setText(e.target.value);
							}}
							required
						/>

						<ModalButton type="submit">
							{isUpdate ? "Update" : "Submit"} review
						</ModalButton>
					</ModalActions>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default ReviewModal;
