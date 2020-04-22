import React, { useState } from "react";
import {
	Card,
	CardImgLink,
	CardImg,
	CardTitle,
	CardPrice,
	CardActions,
	CardButton,
	Select,
	Option,
} from "../../style/styledCard";
import { CartPlus, ShekelSign } from "@styled-icons/fa-solid";
import Heart from "../heart/Heart";
import { useStoreActions } from "easy-peasy";
import { Toast } from "../../style/styledToast";

const Movie = ({ data }) => {
	const [cartAdd, setCartAdd] = useState(false);
	const addToCart = useStoreActions((actions) => actions.cart.addToCart);

	const [avail, setAvail] = useState(0);

	const onSelectChange = (e) => {
		setAvail(e.target.selectedIndex);
	};

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

			<Card>
				<CardImgLink to={`/movie/${data.id}`}>
					<CardImg src={data.cover} alt="Movie cover" />
				</CardImgLink>
				<CardTitle>{data.name}</CardTitle>
				<CardPrice>
					{data.availableIn[avail].price}
					<ShekelSign size="22" />
				</CardPrice>
				<CardActions>
					<Select onChange={onSelectChange}>
						{data.availableIn.map((available) => (
							<Option key={available.format}>{available.format}</Option>
						))}
					</Select>
					<Heart movieId={data.id} />
					<CardButton
						onClick={() => {
							addToCart({
								movieId: data.id,
								name: data.name,
								format: data.availableIn[avail].format,
								price: data.availableIn[avail].price,
							});
							toggleToast();
						}}
					>
						<CartPlus size="20" title="Add to cart!" />
					</CardButton>
				</CardActions>
			</Card>
		</>
	);
};

export default Movie;
