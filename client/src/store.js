import { createStore, action, computed } from "easy-peasy";

let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
	cart = [];
}

const cartModel = {
	cart,
	addToCart: action((state, payload) => {
		let found = false;
		let i;
		for (i = 0; i < state.cart.length && !found; i++) {
			if (
				state.cart[i].movieId === payload.movieId &&
				state.cart[i].format === payload.format
			)
				found = true;
		}
		if (found) {
			if (state.cart[i - 1].quantity < 10) {
				state.cart[i - 1].quantity = payload.quantity
					? payload.quantity
					: state.cart[i - 1].quantity + 1;
			}
		} else state.cart.push({ ...payload, quantity: 1 });
		localStorage.setItem("cart", JSON.stringify(state.cart));
	}),
	removeFromCart: action((state, payload) => {
		if (payload === "all") {
			state.cart = [];
			localStorage.removeItem("cart");
		} else {
			state.cart = state.cart.filter((item) => {
				if (item.movieId === payload.movieId)
					if (item.format === payload.format) return false;
				return true;
			});
			localStorage.setItem("cart", JSON.stringify(state.cart));
		}
	}),
	count: computed((state) =>
		state.cart.reduce((accu, curr) => accu + curr.quantity, 0)
	),
	sumPrice: computed((state) =>
		state.count === 0
			? 0
			: state.cart.reduce(
					(accu, curr) => accu + parseInt(curr.price) * curr.quantity,
					0
			  )
	),
	thankYou: false,
	setThankYou: action((state, payload) => {
		state.thankYou = payload;
	}),
};

const layoutModel = {
	sideNav: false,
	setSideNav: action((state, payload) => {
		state.sideNav = payload;
	}),
};

const searchModel = {
	input: "",
	setInput: action((state, payload) => {
		state.input = payload;
	}),
};

const userModel = {
	accessToken: "",
	setAccessToken: action((state, payload) => {
		state.accessToken = payload;
	}),
};

const storeModel = {
	cart: cartModel,
	layout: layoutModel,
	search: searchModel,
	user: userModel,
};

const store = createStore(storeModel);

export default store;
