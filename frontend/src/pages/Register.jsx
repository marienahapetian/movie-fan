import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { api } from "../api/axios";

const Register = ({ setAuthToken }) => {
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const titleRef = useRef(null);

	const UserSchema = z
		.object({
			name: z.string().trim().normalize(),
			email: z.email().trim().normalize(),
			password: z.string().trim().min(6, "Password must contain at least 6 characters"),
			password2: z.string().trim().min(6, "Password must contain at least 6 characters"),
		})
		.refine((user) => user.password === user.password2, {
			error: "Password mismatch!",
			path: ["password2"],
		});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitted },
	} = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			password2: "",
		},
		resolver: zodResolver(UserSchema),
	});

	async function onFormSubmit(data) {
		try {
			UserSchema.parse(data);
			const res = await api.post("/auth/register", data);
			console.log("aaaa", res.data);
			if (res.data.userId) {
				navigate("/login");
			} else {
				setError(res.message);
			}
		} catch (e) {
			setError("Couldn't create user");
			titleRef.current?.scrollIntoView({
				behavior: "smooth",
			});
			console.log("bbbb", e.message);
		}
	}

	return (
		<form onSubmit={handleSubmit(onFormSubmit)} className="registerForm">
			<h2 ref={titleRef}>Sign Up</h2>
			{error && <span className="error">{error}</span>}
			<div className="input-group">
				<label>Name</label>
				<input type="text" {...register("name")} placeholder="Your full name" />
				{isSubmitted && errors.name && <p className="error-msg">{errors.name.message}</p>}
			</div>
			<div className="input-group">
				<label>Email</label>
				<input type="email" {...register("email")} placeholder="Your email" />
				{isSubmitted && errors.email && <p className="error-msg">{errors.email.message}</p>}
			</div>
			<div className="input-group">
				<label>Password</label>
				<input type="password" {...register("password")} placeholder="Your password" />
				{isSubmitted && errors.password && <p className="error-msg">{errors.password.message}</p>}
			</div>
			<div className="input-group">
				<label>Repeat Password</label>
				<input type="password" {...register("password2")} placeholder="Repeat your password" />
				{isSubmitted && errors.password2 && <p className="error-msg">{errors.password2.message}</p>}
			</div>
			<button type="submit">Register</button>
			<p>
				Already have an account? <Link to="/login">Connect</Link>
			</p>
		</form>
	);
};

export default Register;
