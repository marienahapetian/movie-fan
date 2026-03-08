import { MovieModel } from "../models/movie.model.js";
import { UserModel } from "../models/user.model.js";

export const add = async (req, res) => {
	try {
		const { title, release, genre } = req.body;
		const poster = req.file.filename;
		const releaseDate = new Date(release).toISOString().split("T")[0];
		const existing_movie = await MovieModel.findByTitle(title);
		if (existing_movie) return res.status(400).json({ message: "Movie already exists" });
		const user = await UserModel.findByEmail(req.user.email);
		const userId = user.id;
		const movieId = await MovieModel.add({ title, releaseDate, genre, poster }, userId);
		return res.status(201).json({ message: "Movie created", movieId });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: "Trying to create a movie: Smth went wrong" });
	}
};

export const getAll = async (req, res) => {
	try {
		let movies = await MovieModel.getAll();
		movies = movies.map((m) => ({
			...m,
			poster: "http://localhost:" + process.env.PORT + "/uploads/" + m.poster,
		}));
		return res.status(201).json({ movies });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: "Trying to create a movie: Smth went wrong" });
	}
};

// todo logic to be changed
export const getTrending = async (req, res) => {
	try {
		let movies = await MovieModel.getTrending();
		movies = movies.map((m) => ({
			...m,
			poster: "http://localhost:" + process.env.PORT + "/uploads/" + m.poster,
		}));
		return res.status(201).json({ movies });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: "Trying to create a movie: Smth went wrong" });
	}
};

export const getByUser = async (req, res) => {
	try {
		const user = await UserModel.findByEmail(req.user.email);
		let movies = await MovieModel.getByUser(user.id);
		movies = movies.map((m) => ({
			...m,
			poster: "http://localhost:" + process.env.PORT + "/uploads/" + m.poster,
		}));

		return res.status(201).json({ movies });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: "Trying to create a movie: Smth went wrong" });
	}
};
export const update = (req, res) => {};
