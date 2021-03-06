import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import { useStoreActions } from "easy-peasy";

const App = () => {
	const [loading, setLoading] = useState(true);
	const setAccessToken = useStoreActions(
		(actions) => actions.user.setAccessToken
	);

	useEffect(() => {
		fetch("https://movie-affiliates.herokuapp.com/refresh_token", {
			method: "POST",
			credentials: "include",
		}).then(async (x) => {
			const { accessToken } = await x.json();
			setAccessToken(accessToken);
			setLoading(false);
		});
	}, [setAccessToken]);

	if (loading) {
		return (
			<div className="lds-ellipsis-container">
				<div className="lds-ellipsis">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		);
	}

	return <Routes />;
};

export default App;
