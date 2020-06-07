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

const Movie = ({ data }) => {
	const addToCart = useStoreActions((actions) => actions.cart.addToCart);

	const toastActions = useStoreActions((actions) => actions.toast);

	const [avail, setAvail] = useState(0);

	const onSelectChange = (e) => {
		setAvail(e.target.selectedIndex);
	};

	const toggleToast = () => {
		toastActions.setMessage("Movie added to cart! 🥳");
		toastActions.setVisible(true);
		setTimeout(() => {
			toastActions.setVisible(false);
		}, 2700);
	};

	return (
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
	);
};

export default Movie;
