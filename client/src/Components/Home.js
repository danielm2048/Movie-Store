import React from "react";

import tv from "../style/images/tv.png";
import friends from "../style/images/friends.png";
import {
	HomeHeader,
	ShopButtonContainer,
	ShopButton,
	Mouse,
	HomeTitle,
	HomeText,
	HomeImg,
	HomeDiv,
	HeaderCredit,
} from "../style/styledLayout";
import InfoBar from "./layout/InfoBar";

const Home = ({ history }) => {
	return (
		<div
			style={{
				fontFamily: `"Ubuntu", sans-serif`,
			}}
		>
			<HomeHeader>
				<ShopButtonContainer>
					<HomeTitle>WELCOME TO{"\n"}MOVIE AFFILIATES</HomeTitle>
					<ShopButton onClick={() => history.replace("/movies")}>
						SHOP NOW
					</ShopButton>
					<HeaderCredit>
						<a href="https://www.freepik.com/free-photos-vectors/background">
							photo created by freepik
						</a>
						<br />
						<a href="https://www.freepik.com/free-photos-vectors/design">
							Design vector created by pch.vector
						</a>
						<br />
						<a href="https://my.logomakr.com/">
							Created my free logo at LogoMakr.com
						</a>
					</HeaderCredit>
				</ShopButtonContainer>
				<Mouse />
			</HomeHeader>
			<HomeDiv style={{ marginTop: "100vh" }}>
				<HomeText marginLeftSize="3em">
					BUY SOME MOVIES{"\n"}AND ENJOY THEM{"\n"}RIGHT AT HOME!
				</HomeText>
				<HomeImg
					alt="girl watching tv"
					perc={55}
					src={tv}
					style={{ marginLeft: "auto" }}
				/>
			</HomeDiv>
			<InfoBar />
			<HomeDiv>
				<HomeImg alt="friends" perc={65} src={friends} />
				<HomeText>
					EVEN WITH SOME {"\n"}OF YOUR BEST FRIENDS! {"\n"}YOUR CHOICE!
				</HomeText>
			</HomeDiv>
		</div>
	);
};

export default Home;
