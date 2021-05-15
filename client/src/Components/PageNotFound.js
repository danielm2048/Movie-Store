import React from "react";
import { Link } from "react-router-dom";

import notFound from "../style/images/404.jpg";
import { HomeImg, NotFoundText } from "../style/styledLayout";

const PageNotFound = () => (
	<div style={{ textAlign: "center" }}>
		<HomeImg
			src={notFound}
			style={{ position: "relative", margin: "0 auto" }}
			perc={50}
			alt="404 - Not found"
		/>
		<NotFoundText>
			<h1>Uh oh!</h1>
			<p>Page can't be found.</p>
			<Link to="/">Back Home</Link>
		</NotFoundText>
		<span style={{ fontSize: 14 }}>
			<a href="https://www.freepik.com/vectors/business">
				vector created by pikisuperstar
			</a>
		</span>
	</div>
);

export default PageNotFound;
