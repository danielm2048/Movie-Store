import React, { useState, useEffect } from "react";
import { Container, List, Item } from "../../style/styledList";
import Movie from "./Movie";
import Pagination from "../layout/Pagination";
import { useQuery } from "@apollo/react-hooks";
import { GET_MOVIES } from "../../graphql/gqlDocs";
import { useStoreState } from "easy-peasy";
import SelectDropDown from "../layout/SelectDropDown";

const MovieList = () => {
	const [genre, setGenre] = useState("All");
	const [currentPage, setCurrentPage] = useState(1);
	const [moviesPerPage] = useState(6);
	const { data, loading, error } = useQuery(GET_MOVIES);

	const searchInput = useStoreState((state) => state.search.input);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchInput]);

	if (loading)
		return (
			<div className="lds-ripple">
				<div></div>
				<div></div>
			</div>
		);

	if (error) {
		console.log(error);
		return <div>Error</div>;
	}

	const genres = [
		"All",
		"Action",
		"Adventure",
		"Animation",
		"Crime",
		"Drama",
		"Horror",
		"Romance",
		"Thriller",
		"Science Fiction",
	];

	const onSelectChange = (option) => {
		setGenre(option);
		setCurrentPage(1);
	};

	const moviesByGenre = data.getMovies.filter(
		(movie) => movie.genre === genre || genre === "All"
	);

	const moviesToRender =
		searchInput === ""
			? moviesByGenre
			: moviesByGenre.filter((movie) =>
					movie.name
						.toLowerCase()
						.replace(":", "")
						.includes(searchInput.toLowerCase().replace(":", ""))
			  );

	const indexOfLastMovie = currentPage * moviesPerPage;
	const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
	const currentMovies = moviesToRender.slice(
		indexOfFirstMovie,
		indexOfLastMovie
	);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
		window.scrollTo(0, 0);
	};

	return (
		<Container>
			<SelectDropDown
				options={genres}
				selected={genre}
				setSelected={onSelectChange}
			/>
			<List>
				{currentMovies.map((movie) => (
					<Item key={movie.id}>
						<Movie data={movie} />
					</Item>
				))}
			</List>
			<Pagination
				moviesPerPage={moviesPerPage}
				totalMovies={moviesToRender.length}
				paginate={paginate}
				curr={currentPage}
			/>
		</Container>
	);
};

export default MovieList;
