import "../assets/styles/Home.css";
import lacasadepapel from "/movies/lacasadepapel.jpg";
import sinners from "/movies/sinners.jpg";
import prettywoman from "/movies/prettywoman.jpg";
import moonstruck from "/movies/moonstruck.jpg";
import lordoftherings from "/movies/lordoftherings.jpg";
import killbill from "/movies/killbill.jpg";
import starwars from "/movies/starwars.jpg";
const Movies = () => {
	return (
		<div>
			<section className="movies">
				<h2>All Movies</h2>

				<div className="movie-grid">
					<div className="movie-card">
						<img src={starwars} alt="Star Wars" />
						<div className="movie-overlay">
							<h3>Star Wars</h3>
							<span className="rating">⭐ 9.2</span>
						</div>
					</div>

					<div className="movie-card">
						<img src={killbill} alt="Kill Bill" />
						<div className="movie-overlay">
							<h3>Kill Bill</h3>
							<span className="rating">⭐ 9.2</span>
						</div>
					</div>

					<div className="movie-card">
						<img src={lordoftherings} alt="Lord of the rings" />
						<div className="movie-overlay">
							<h3>Lord of the rings</h3>
							<span className="rating">⭐ 8.2</span>
						</div>
					</div>

					<div className="movie-card">
						<img src={lacasadepapel} alt="La Casa de Papel" />
						<div className="movie-overlay">
							<h3>La Casa de Papel</h3>
							<span className="rating">⭐ 8.7</span>
						</div>
					</div>

					<div className="movie-card">
						<img src={sinners} alt="Sinners" />
						<div className="movie-overlay">
							<h3>Sinners</h3>
							<span className="rating">⭐ 9.1</span>
						</div>
					</div>

					<div className="movie-card">
						<img src={prettywoman} alt="Pretty Woman" />
						<div className="movie-overlay">
							<h3>Pretty Woman</h3>
							<span className="rating">⭐ 8.4</span>
						</div>
					</div>

					<div className="movie-card">
						<img src={moonstruck} alt="Moon Struck" />
						<div className="movie-overlay">
							<h3>Moon Struck</h3>
							<span className="rating">⭐ 8.2</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Movies;
