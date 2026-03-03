import { useForm } from "react-hook-form";
import "../assets/styles/Form.css";
import { api } from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {
	const { login, logout } = useContext(AuthContext);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			login(token);
		}
	}, []);

	async function onFormSubmit(data) {
		try {
			console.log(data);
			const res = await api.post("/auth/login", data);
			console.log("aaaa", res.data);
			if (res.data.token) {
				login(res.data.token);
			} else {
				logout();
			}
		} catch (error) {
			setError("Invalid credentials");
			console.log("bbbb", error);
		}
	}
	return (
		<form onSubmit={handleSubmit(onFormSubmit)} className="loginForm">
			<h2>Log In</h2>
			{error && <span className="error">{error}</span>}
			<div className="input-group">
				<label>Email</label>
				<input type="email" {...register("email", { required: true })} placeholder="Email" />
			</div>
			<div className="input-group">
				<label>Password</label>
				<input type="password" {...register("password", { required: true })} placeholder="Password" />
			</div>
			<button type="submit">Login</button>
			<p>
				Don't have an account yet? <Link to="/register">Sign Up First</Link>
			</p>
		</form>
	);
};

export default Login;
