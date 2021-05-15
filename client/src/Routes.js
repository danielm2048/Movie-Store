import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import ScrollToTop from "./Components/layout/ScrollToTop";

import NavBar from "./Components/layout/NavBar";
import Header from "./Components/layout/Header";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import MovieList from "./Components/movies/MovieList";
import MoviePage from "./Components/movies/MoviePage";
import Wishlist from "./Components/user/Wishlist";
import AddMovie from "./Components/admin/AdminSection";
import Footer from "./Components/layout/Footer";
import CartSideBar from "./Components/cart/CartSideBar";
import { Canvas, Main, Content } from "./style/styledLayout";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useQuery } from "react-apollo";
import { GET_USER } from "./graphql/gqlDocs";
import PageNotFound from "./Components/PageNotFound";
import Checkout from "./Components/cart/Checkout";
import ThankYou from "./Components/user/ThankYou";
import { Toast } from "./style/styledToast";
import ReviewModal from "./Components/movies/ReviewModal";
import ChangePassword from "./Components/auth/ChangePassword";

const PrivateRoute = ({ component: Component, role, ...rest }) => {
	const { data, loading } = useQuery(GET_USER);

	if (loading)
		return (
			<div className="lds-ripple">
				<div></div>
				<div></div>
			</div>
		);

	const userType =
		data && data.getUser && !loading
			? data.getUser.admin
				? "ADMIN"
				: "USER"
			: null;

	return (
		<Route
			{...rest}
			render={(props) =>
				userType && (role === userType || userType === "ADMIN") ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: "/", state: { from: props.location } }} />
				)
			}
		/>
	);
};

const ThankYouRoute = ({ ...rest }) => {
	const auth = useStoreState((state) => state.cart.thankYou);

	return (
		<Route
			{...rest}
			render={(props) =>
				auth ? (
					<ThankYou />
				) : (
					<Redirect to={{ pathname: "/", state: { from: props.location } }} />
				)
			}
		/>
	);
};

const Routes = () => {
	const sideNav = useStoreState((state) => state.layout.sideNav);
	const setSideNav = useStoreActions((actions) => actions.layout.setSideNav);
	const toast = useStoreState((state) => state.toast);

	return (
		<>
			<Main sideNav={sideNav}>
				<Canvas sideNav={sideNav} onClick={() => setSideNav(false)} />
				<NavBar />
				<Header />
				<Content>
					<ScrollToTop />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/about" component={About} />
						<Route path="/contact" component={Contact} />
						<Route path="/movies" component={MovieList} />
						<Route path="/movie/:id" component={MoviePage} />
						<PrivateRoute path="/wishlist" role="USER" component={Wishlist} />
						<PrivateRoute
							path="/admin-section"
							role="ADMIN"
							component={AddMovie}
						/>
						<Route path="/checkout" component={Checkout} />
						<ThankYouRoute exact path="/thank-you" />
						<Route path="/change-password/:token" component={ChangePassword} />
						<Route path="/404" component={PageNotFound} />
						<Redirect to="/404" />
					</Switch>
					<ReviewModal />
					<Toast visible={toast.visible}>{toast.message}</Toast>
				</Content>
				<Footer />
			</Main>
			<CartSideBar />
		</>
	);
};

export default Routes;
