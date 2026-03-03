import { useForm } from "react-hook-form";
import "../assets/styles/Form.css";
import { api } from "../api/axios";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const Login = () => {
	const { login, logout } = useContext(AuthContext);
	const [error, setError] = useState(null);
	const UserSchema = z.object({
		email: z.email(),
		password: z.string().min(6, "Password must contain at least 6 characters"),
	});
	const titleRef = useRef(null);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitted },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(UserSchema),
	});

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			login(token);
		}
	}, []);

	async function onFormSubmit(data) {
		console.log(data);
		try {
			UserSchema.parse(data);
			const res = await api.post("/auth/login", data);
			console.log("aaaa", res.data);
			if (res.data.token) {
				login(res.data.token);
			} else {
				logout();
			}
		} catch (e) {
			setError("Invalid credentials");
			titleRef.current?.scrollIntoView({
				behavior: "smooth",
			});
			console.log("bbbb", e);
		}
	}
	return (
		<form onSubmit={handleSubmit(onFormSubmit)} className="loginForm">
			<h2 ref={titleRef}>Log In</h2>
			{error && <span className="error">{error}</span>}
			<div className="input-group">
				<label>Email</label>
				<input type="email" {...register("email", { required: true })} placeholder="Email" />
				{isSubmitted && errors.email && <p className="error-msg">{errors.email.message}</p>}
			</div>
			<div className="input-group">
				<label>Password</label>
				<input type="password" {...register("password", { required: true })} placeholder="Password" />
				{isSubmitted && errors.password && <p className="error-msg">{errors.password.message}</p>}
			</div>
			<button type="submit">Login</button>
			<p>
				Don't have an account yet? <Link to="/register">Sign Up First</Link>
			</p>
		</form>
	);
};

export default Login;
