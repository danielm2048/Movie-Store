import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { StoreProvider } from "easy-peasy";
import store from "./store";

const httpLink = createHttpLink({
	uri: "http://192.168.1.164:4000/graphql",
	credentials: "include",
});

const authLink = setContext((_, { headers }) => {
	const accessToken = store.getState().user.accessToken;
	console.log(accessToken);
	return {
		headers: {
			...headers,
			Authorization: accessToken ? `Bearer ${accessToken}` : "",
		},
	};
});

const client = new ApolloClient({
	link: ApolloLink.from([
		new TokenRefreshLink({
			accessTokenField: "accessToken",
			isTokenValidOrUndefined: () => {
				const token = store.getState().user.accessToken;

				if (!token) {
					return true;
				}

				try {
					const { exp } = jwtDecode(token);
					if (Date.now() >= exp * 1000) {
						return false;
					} else {
						return true;
					}
				} catch {
					return false;
				}
			},
			fetchAccessToken: () => {
				return fetch("http://192.168.1.164:4000/refresh_token", {
					method: "POST",
					credentials: "include",
				});
			},
			handleFetch: (accessToken) => {
				store.getActions().user.setAccessToken(accessToken);
			},
			handleError: (err) => {
				console.warn("Your refresh token is invalid. Try to relogin");
				console.error(err);
			},
		}),
		authLink,
		httpLink,
	]),
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<BrowserRouter>
		<ApolloProvider client={client}>
			<StoreProvider store={store}>
				<App />
			</StoreProvider>
		</ApolloProvider>
	</BrowserRouter>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
