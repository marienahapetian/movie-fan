import "../assets/styles/Home.css";
import lacasadepapel from "/movies/lacasadepapel.jpg";
import sinners from "/movies/sinners.jpg";
import prettywoman from "/movies/prettywoman.jpg";
import moonstruck from "/movies/moonstruck.jpg";
const Home = () => {
	return (
		<div>
			<section className="movies">
				<h2>Trending Movies</h2>

				<div className="movie-grid">
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

export default Home;
