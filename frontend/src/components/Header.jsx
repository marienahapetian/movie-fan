import { useContext, useState } from "react";
import "../assets/styles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
	const { user, logout } = useContext(AuthContext);
	const [searchOn, setSearchOn] = useState(false);
	const navigate = useNavigate();

	function handleSearchClick(e) {
		e.preventDefault();
		setSearchOn((current) => !current);
	}
	function search(formData) {
		const query = formData.get("query");
		alert(`You searched for '${query}'`);
	}
	return (
		<header className="header">
			<div className="logo">
				<Link to="/">MovieFan</Link>
			</div>

			<nav className="nav">
				<Link to="/">Home</Link>
				<Link to="/movies">Movies</Link>
				<span onClick={handleSearchClick}>Search</span>

				{!user && (
					<Link to="/login" className="btn">
						Login
					</Link>
				)}
				{user && (
					<button onClick={logout} className="btn">
						Logout
					</button>
				)}
			</nav>
			{searchOn && (
				<form className="search-form" action={search}>
					<input name="query" placeholder="Search movies..." />
					<button type="submit">Search</button>
				</form>
			)}
		</header>
	);
};

export default Header;
