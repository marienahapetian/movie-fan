import "../assets/styles/Dashboard.css";
function Dashboard() {
	return (
		<section className="dashboard">
			<h1>Welcome Back, John 👋</h1>

			<div className="dashboard-grid">
				<div className="card">
					<h3>Total Watch Time</h3>
					<p className="card-value">124 hrs</p>
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
