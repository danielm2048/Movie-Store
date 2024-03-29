import React, { useState, useEffect } from "react";
import "./style.css";
import { useQuery, useMutation } from "react-apollo";
import { GET_USER, WISH } from "../../graphql/gqlDocs";
import { useStoreActions } from "easy-peasy";

const Heart = ({ movieId }) => {
	const [check, setCheck] = useState(false);
	const toastActions = useStoreActions((actions) => actions.toast);

	const { data: dataUser, loading, refetch } = useQuery(GET_USER);

	const [wish] = useMutation(WISH);

	useEffect(() => {
		if (dataUser && dataUser.getUser) {
			const flag =
				dataUser.getUser.wishlist.filter((w) => w.movie.id === movieId).length >
				0;
			setCheck(flag);
		}
	}, [dataUser, movieId]);

	if (loading) {
		return null;
	}

	const toggle = async () => {
		if (dataUser && dataUser.getUser) {
			await wish({
				variables: {
					movieId: movieId,
					active: !check,
				},
			});
			refetch();
			setCheck(!check);
		} else {
			toastActions.setMessage("You need to be logged in to wish... 🥺");
			toastActions.setVisible(true);
			setTimeout(() => {
				toastActions.setVisible(false);
			}, 2700);
		}
	};

	return (
		<div id="main-content">
			<div>
				<input type="checkbox" id={movieId} checked={check} onChange={toggle} />
				<label htmlFor={movieId}>
					<svg
						id="heart-svg"
						viewBox="467 392 58 57"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g
							id="Group"
							fill="none"
							fillRule="evenodd"
							transform="translate(467 392)"
						>
							<path
								d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
								id="heart"
								fill="#AAB8C2"
							/>
							<circle
								id="main-circ"
								fill="#E2264D"
								opacity="0"
								cx="29.5"
								cy="29.5"
								r="1.5"
							/>
							<g id="grp7" opacity="0" transform="translate(7 6)">
								<circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
								<circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
							</g>
							<g id="grp6" opacity="0" transform="translate(0 28)">
								<circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
								<circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
							</g>
							<g id="grp3" opacity="0" transform="translate(52 28)">
								<circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
								<circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
							</g>
							<g
								id="grp2"
								opacity="0"
								transform="translate(44 6)"
								fill="#CC8EF5"
							>
								<circle
									id="oval2"
									transform="matrix(-1 0 0 1 10 0)"
									cx="5"
									cy="6"
									r="2"
								/>
								<circle
									id="oval1"
									transform="matrix(-1 0 0 1 4 0)"
									cx="2"
									cy="2"
									r="2"
								/>
							</g>
							<g
								id="grp5"
								opacity="0"
								transform="translate(14 50)"
								fill="#91D2FA"
							>
								<circle
									id="oval1"
									transform="matrix(-1 0 0 1 12 0)"
									cx="6"
									cy="5"
									r="2"
								/>
								<circle
									id="oval2"
									transform="matrix(-1 0 0 1 4 0)"
									cx="2"
									cy="2"
									r="2"
								/>
							</g>
							<g
								id="grp4"
								opacity="0"
								transform="translate(35 50)"
								fill="#F48EA7"
							>
								<circle
									id="oval1"
									transform="matrix(-1 0 0 1 12 0)"
									cx="6"
									cy="5"
									r="2"
								/>
								<circle
									id="oval2"
									transform="matrix(-1 0 0 1 4 0)"
									cx="2"
									cy="2"
									r="2"
								/>
							</g>
							<g id="grp1" opacity="0" transform="translate(24)" fill="#9FC7FA">
								<circle id="oval1" cx="2.5" cy="3" r="2" />
								<circle id="oval2" cx="7.5" cy="2" r="2" />
							</g>
						</g>
					</svg>
				</label>
			</div>
		</div>
	);
};

export default Heart;
