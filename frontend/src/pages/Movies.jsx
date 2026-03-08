import { useEffect, useState } from "react";
import "../assets/styles/Home.css";
import MovieCard from "../components/MovieCard";
import { api } from "../api/axios";

const Movies = () => {
	const [movies, setMovies] = useState([]);
	useEffect(() => {
		async function getAllMovies() {
			const res = await api.get("/movies");
			if (res.data.movies) {
				console.log(res.data.movies);
				setMovies(res.data.movies);
			}
		}
		getAllMovies();
	}, []);
	return (
		<div>
			<section className="movies">
				<h2>All Movies</h2>

				<div className="movie-grid">
					{movies.map((movie) => (
						<MovieCard {...movie}></MovieCard>
					))}
				</div>
			</section>
		</div>
	);
};

export default Movies;
