import React, { useState } from "react";
import {
	MoviePageContainer,
	MovieImg,
	MovieDetail,
	MoviePageRow,
	MoviePageColumn,
	MoviePageTitle,
	MovieWarning,
} from "../../style/StyledMoviePage";
import { useQuery } from "@apollo/react-hooks";
import { GET_MOVIE } from "../../graphql/gqlDocs";
import {
	CardPrice,
	CardActions,
	CardButton,
	Select,
	Option,
} from "../../style/styledCard";
import { CartPlus, ShekelSign } from "@styled-icons/fa-solid";
import Heart from "../heart/Heart";
import { Toast } from "../../style/styledToast";
import { useStoreActions } from "easy-peasy";
import PageNotFound from "../PageNotFound";

const MoviePage = ({ match }) => {
	const [cartAdd, setCartAdd] = useState(false);
	const addToCart = useStoreActions((actions) => actions.cart.addToCart);

	const [avail, setAvail] = useState(0);

	const onSelectChange = (e) => {
		setAvail(e.target.selectedIndex);
	};

	const { data, loading, error } = useQuery(GET_MOVIE, {
		variables: { movieId: match.params.id },
	});

	if (loading)
		return (
			<div className="lds-ripple">
				<div></div>
				<div></div>
			</div>
		);

	if (error) {
		return <PageNotFound />;
	}

	const toggleToast = () => {
		setCartAdd(true);
		setTimeout(() => {
			setCartAdd(false);
		}, 2700);
	};

	return (
		<>
			{/* eslint-disable-next-line */}
			<Toast clicked={cartAdd}>Movie added to cart! 🥳</Toast>

			<MoviePageContainer>
				<MoviePageRow>
					<MoviePageColumn>
						<MovieImg src={data.getMovie.cover} />
						<CardPrice
							style={{
								margin: "5%",
								textAlign: "center",
								maxWidth: "350px",
								fontSize: 28,
							}}
						>
							{data.getMovie.availableIn[avail].price}
							<ShekelSign size="22" />
						</CardPrice>
						<CardActions style={{ maxWidth: "400px" }}>
							<Select onChange={onSelectChange}>
								{data.getMovie.availableIn.map((available) => (
									<Option key={available.format}>{available.format}</Option>
								))}
							</Select>
							<Heart movieId={data.getMovie.id} />
							<CardButton
								onClick={() => {
									addToCart({
										movieId: data.getMovie.id,
										name: data.getMovie.name,
										format: data.getMovie.availableIn[avail].format,
										price: data.getMovie.availableIn[avail].price,
									});
									toggleToast();
								}}
							>
								<CartPlus size="20" title="Add to cart!" />
							</CardButton>
						</CardActions>
						<MovieWarning
							isLow={data.getMovie.availableIn[avail].stock < 100}
						>{`Hurry up! there's only ${data.getMovie.availableIn[avail].stock} copies left!`}</MovieWarning>
					</MoviePageColumn>
					<MoviePageColumn>
						<MoviePageTitle>
							<b>{data.getMovie.name}</b>
						</MoviePageTitle>

						<label htmlFor="dir">
							<b>Director</b>
						</label>
						<MovieDetail id="dir">{data.getMovie.director}</MovieDetail>

						<label htmlFor="cast">
							<b>Cast</b>
						</label>
						<MovieDetail id="cast">
							{data.getMovie.cast.map((c, i) => {
								return <p key={i}>{c}</p>;
							})}
						</MovieDetail>

						<label htmlFor="genre">
							<b>Genre</b>
						</label>
						<MovieDetail id="genre">{data.getMovie.genre}</MovieDetail>

						<label htmlFor="date">
							<b>Release Year</b>
						</label>
						<MovieDetail id="date">{data.getMovie.releaseDate}</MovieDetail>

						<label htmlFor="time">
							<b>Runtime</b>
						</label>
						<MovieDetail id="time">{data.getMovie.runtime}</MovieDetail>

						<label htmlFor="lang">
							<b>Languages</b>
						</label>
						<MovieDetail id="lang">{data.getMovie.language}</MovieDetail>

						<label htmlFor="desc">
							<b>Description</b>
						</label>
						<MovieDetail id="desc">{data.getMovie.description}</MovieDetail>
					</MoviePageColumn>
				</MoviePageRow>
			</MoviePageContainer>
		</>
	);
};

export default MoviePage;
