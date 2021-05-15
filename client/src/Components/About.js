import React from "react";
import { AboutText, HomeImg } from "../style/styledLayout";

import movie from "../style/images/movie.gif";

const About = () => {
	return (
		<div style={{ display: "flex" }}>
			<AboutText>
				<h1>Hi everyone! Welcome to my movie store!!</h1>
				<p>{about}</p>
			</AboutText>

			<HomeImg
				alt="popcorn gif"
				perc={30}
				src={movie}
				style={{
					position: "sticky",
					top: 150,
					margin: "0 auto",
					height: "50%",
				}}
			/>
		</div>
	);
};

export default About;

const about = `
Ever since I can remember myself I had a true passion for film and cinema.
I made this website so I can express my love for this incredible art form!
\n
Here you'll be able to find the newest movies
fresh from the cinema but also the classics we all know and love.
\n
I really hope you enjoy it.
\n
Daniel
`;
