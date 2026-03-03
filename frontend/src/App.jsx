import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Movies from "./pages/Movies";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";
function App() {
	const [authToken, setAuthToken] = useState(null);

	useEffect(() => {
		console.log("getting token in app.jsx");
		const token = localStorage.getItem("token");
		if (token) {
			setAuthToken(token);
		}
	}, []);

	return (
		<>
			<BrowserRouter>
				<Header authToken={authToken} setAuthToken={setAuthToken} />

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
					<Route path="/register" element={<Register setAuthToken={setAuthToken} />} />
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
					<Route path="/movies" element={<Movies />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
