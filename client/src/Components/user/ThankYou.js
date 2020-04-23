import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => (
	<section style={{ textAlign: "center" }}>
		<h1>Thank you so much for your purchase!</h1>
		<p>You will be redirected to our homepage in a few seconds...</p>
		<Link to="/">Back Home</Link>
	</section>
);

export default ThankYou;
