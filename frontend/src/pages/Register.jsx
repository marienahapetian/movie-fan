import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ setAuthToken }) => {
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const { register, handleSubmit } = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			password2: "",
		},
	});

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			setAuthToken(token);
			navigate("/");
		}
	}, []);

	function onFormSubmit(data) {}

	return (
		<form onSubmit={handleSubmit(onFormSubmit)} className="registerForm">
			<h2>Sign Up</h2>
			{error && <span className="error">{error}</span>}
			<div className="input-group">
				<label>Name</label>
				<input type="text" {...register("name")} placeholder="Your full name" />
			</div>
			<div className="input-group">
				<label>Email</label>
				<input type="email" {...register("email")} placeholder="Your email" />
			</div>
			<div className="input-group">
				<label>Password</label>
				<input type="password" {...register("password")} placeholder="Your password" />
			</div>
			<div className="input-group">
				<label>Repeat Password</label>
				<input type="password" {...register("password2")} placeholder="Repeat your password" />
			</div>
			<button type="submit">Register</button>
			<p>
				Already have an account? <Link to="/login">Connect</Link>
			</p>
		</form>
	);
};

export default Register;
