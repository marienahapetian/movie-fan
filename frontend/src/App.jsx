import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Movies from "./pages/Movies";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./providers/AuthProvider";
import NewMovie from "./pages/NewMovie";

function App() {
	return (
		<>
			<BrowserRouter>
				<AuthProvider>
					<Header />

					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route
							path="/movie/add"
							element={
								<ProtectedRoute>
									<NewMovie />
								</ProtectedRoute>
							}
						/>
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
				</AuthProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
