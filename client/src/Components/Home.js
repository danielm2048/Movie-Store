import React from "react";

import fam from "../style/images/fam.png";
import friends from "../style/images/friends.png";
import {
	HomeHeader,
	ShopButtonContainer,
	ShopButton,
	Mouse,
	HomeTitle,
	InfoBar,
	HomeText,
	HomeImg,
	HomeDiv,
	HeaderCredit,
} from "../style/styledLayout";

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
			<HomeDiv>
				<HomeText marginLeftSize="5em">
					BUY SOME MOVIES{"\n"}AND ENJOY THEM{"\n"}WITH YOUR FAMILY!
				</HomeText>
				<HomeImg
					alt="family"
					perc="40"
					src={fam}
					style={{ marginLeft: "auto" }}
				/>
			</HomeDiv>
			<InfoBar />
			<HomeDiv>
				<HomeImg alt="friends" perc="75" src={friends} />
				<HomeText>
					OR WITH SOME {"\n"}OF YOUR BEST FRIENDS! {"\n"}YOUR CHOICE!
				</HomeText>
			</HomeDiv>
		</div>
	);
};

export default Home;
