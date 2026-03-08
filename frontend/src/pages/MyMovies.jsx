import React, { useEffect, useState } from "react";
import { api } from "../api/axios";
import MovieCard from "../components/MovieCard";

const MyMovies = () => {
	const [movies, setMovies] = useState([]);
	useEffect(() => {
		async function getMyMovies() {
			const token = localStorage.getItem("token");

			const res = await api.get("/movies/mine", { headers: { Authorization: `Bearer ${token}` } });
			if (res.data.movies) {
				console.log(res.data.movies);
				setMovies(res.data.movies);
			}
		}
		getMyMovies();
	}, []);
	return (
		<section className="movies">
			<h2>All Movies</h2>

			<div className="movie-grid">
				{movies.map((movie) => (
					<MovieCard {...movie}></MovieCard>
				))}
			</div>
		</section>
	);
};

export default MyMovies;
