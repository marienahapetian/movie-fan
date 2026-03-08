import React from "react";
import { api } from "../api/axios";

const MovieCard = ({ poster, title, rating, releaseDate }) => {
	return (
		<div className="movie-card">
			<img src={poster} alt={title} />
			<div className="movie-overlay">
				<h3>{title}</h3>
				<span className="rating">⭐ {rating}</span>
				<span className="release">📅 {releaseDate}</span>
			</div>
		</div>
	);
};

export default MovieCard;
