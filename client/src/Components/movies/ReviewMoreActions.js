import React, { useEffect, useRef, useState } from "react";
import { useStoreActions } from "easy-peasy";

import { MoreHorizontal } from "@styled-icons/evaicons-solid";
import { useMutation } from "react-apollo";
import { GET_MOVIE, DELETE_REVIEW, GET_USER } from "../../graphql/gqlDocs";
import { CardButton } from "../../style/styledCard";

const ReviewMoreActions = ({ reviewId, movie }) => {
	const { setModal, setMovieId } = useStoreActions(
		(actions) => actions.reviewModal
	);

	const [open, setOpen] = useState(false);

	const [deleteReview] = useMutation(DELETE_REVIEW);

	const onDelete = async () => {
		await deleteReview({
			variables: {
				reviewId,
			},
			refetchQueries: [
				{ query: GET_USER },
				{
					query: GET_MOVIE,
					variables: {
						movieId: movie.id,
					},
				},
			],
		});
	};

	const onEditClick = () => {
		setMovieId(movie.id);
		setModal(true);
	};

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setOpen(false);
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
		<div
			ref={ref}
			style={{
				position: "absolute",
				right: 0,
				top: 0,
				display: "flex",
				flexDirection: "column",
			}}
		>
			<MoreHorizontal
				onClick={() => setOpen(!open)}
				style={{ margin: "0 0 0 auto" }}
			/>
			{open && (
				<div style={{ display: "flex", flexDirection: "column", zIndex: 5 }}>
					<CardButton
						onClick={onEditClick}
						style={{ width: "100%", marginBottom: 10, fontSize: 16 }}
					>
						Edit{" "}
						<span role="img" aria-label="keyboard emoji">
							✒️
						</span>
					</CardButton>

					<CardButton
						onClick={onDelete}
						style={{ width: "100%", fontSize: 16 }}
					>
						Delete{" "}
						<span role="img" aria-label="trash emoji">
							🗑️
						</span>
					</CardButton>
				</div>
			)}
		</div>
	);
};

export default ReviewMoreActions;
