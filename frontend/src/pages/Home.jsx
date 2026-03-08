import { useEffect, useState } from "react";
import "../assets/styles/Home.css";
import MovieCard from "../components/MovieCard";
import { api } from "../api/axios";
const Home = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		async function getTrendingMovies() {
			const res = await api.get("/movies/trending");
			if (res.data.movies) {
				console.log(res.data.movies);
				setMovies(res.data.movies);
			}
		}

		getTrendingMovies();
	});
	return (
		<div>
			<section className="movies">
				<h2>Trending Movies</h2>

				<div className="movie-grid">
					{movies.map((movie) => (
						<MovieCard {...movie}></MovieCard>
					))}
				</div>
			</section>
		</div>
	);
};

export default Home;
