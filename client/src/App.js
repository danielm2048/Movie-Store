import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import { useStoreActions } from "easy-peasy";

const App = () => {
	const [loading, setLoading] = useState(true);
	const setAccessToken = useStoreActions(
		(actions) => actions.user.setAccessToken
	);

	useEffect(() => {
		fetch("http://192.168.1.164:4000/refresh_token", {
			method: "POST",
			credentials: "include",
		}).then(async (x) => {
			const { accessToken } = await x.json();
			setAccessToken(accessToken);
			setLoading(false);
		});
	}, [setAccessToken]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return <Routes />;
};

export default App;
