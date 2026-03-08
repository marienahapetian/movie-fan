import { useNavigate } from "react-router-dom";
import "../assets/styles/Dashboard.css";
import AddMovieButton from "../components/AddMovieButton";
function Dashboard() {
	const navigate = useNavigate();
	return (
		<section className="dashboard">
			<h1>Welcome Back, John 👋</h1>
			<AddMovieButton onClick={() => navigate("/movie/add")} />

			<div className="dashboard-grid">
				<div className="card" onClick={() => navigate("/dashboard/movies")}>
					<h3>Your movies</h3>
					<p className="card-value">12</p>
				</div>

				<div className="card">
					<h3>Favorite Genre</h3>
					<p className="card-value">Sci-Fi</p>
				</div>

				<div className="card">
					<h3>Movies Watched</h3>
					<p className="card-value">58</p>
				</div>

				<div className="card">
					<h3>Account Status</h3>
					<p className="card-value active">Premium</p>
				</div>
			</div>
		</section>
	);
}

export default Dashboard;
