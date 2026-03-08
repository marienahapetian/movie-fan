import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { api } from "../api/axios";

const NewMovie = () => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isSubmitted },
	} = useForm();
	const titleRef = useRef();
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const MovieSchema = z.object({
		title: z.string(),
		release: z.coerce.date(),
		genre: z.enum(["comedy", "drama", "history"]),
		poster: z
			.instanceof(FileList)
			.refine((files) => files.length === 1, "Poster is required")
			.transform((files) => files[0])
			.pipe(z.file().mime(["image/png", "image/jpeg"]).max(10_000_000)),
	});

	async function onFormSubmit(data) {
		try {
			const parsed = MovieSchema.parse(data);
			console.log(parsed);
			const formData = new FormData();
			formData.append("title", parsed.title);
			formData.append("genre", parsed.genre);
			formData.append("release", parsed.release.toISOString());
			formData.append("poster", parsed.poster);
			const token = localStorage.getItem("token");

			const res = await api.post("/movies/add", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			});
			console.log("aaaa", res.data);
			if (res.data.movieId) {
				setSuccessMessage("Movie Added Successfully");
				reset();
			} else {
				setError("Movie could not be added");
				titleRef.current?.scrollIntoView({
					behavior: "smooth",
				});
				console.log("bbbb", e);
			}
		} catch (e) {
			console.log(e);
		}
	}
	return (
		<form onSubmit={handleSubmit(onFormSubmit)} className="movieForm">
			<h2 ref={titleRef}>Add New Movie</h2>
			{error && <span className="error">{error}</span>}
			{successMessage && <span className="success">{successMessage}</span>}
			<div className="input-group">
				<label>Title</label>
				<input type="text" {...register("title", { required: true })} placeholder="Movie Title" />
				{isSubmitted && errors.title && <p className="error-msg">{errors.title.message}</p>}
			</div>
			<div className="input-group">
				<label>Release Date</label>
				<input type="date" {...register("release", { required: true })} placeholder="Movie Release Date" />
				{isSubmitted && errors.release && <p className="error-msg">{errors.release.message}</p>}
			</div>
			<div className="input-group">
				<label>Genre</label>
				<select {...register("genre", { required: true })}>
					<option value="drama">Drama</option>
					<option value="comedy">Comedy</option>
					<option value="history">History</option>
				</select>
				{isSubmitted && errors.genre && <p className="error-msg">{errors.genre.message}</p>}
			</div>
			<div className="input-group">
				<label>Poster</label>
				<input type="file" accept="image/png, image/jpeg" {...register("poster", { required: true })} />
				{isSubmitted && errors.poster && <p className="error-msg">{errors.poster.message}</p>}
			</div>
			<button type="submit">Add Movie</button>
		</form>
	);
};

export default NewMovie;
