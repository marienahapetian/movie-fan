import { db } from "../config/db.js";
import { getByUser, getTrending } from "../controllers/movie.controller.js";

export const MovieModel = {
	add: async ({ title, releaseDate, genre, poster }, userId) => {
		const [result] = await db.execute("INSERT INTO movies (title, releaseDate, genre, poster, user_id) VALUES (?, ?, ?, ?, ?)", [title, releaseDate, genre, poster, userId]);
		return result.insertId;
	},

	update: async (id, { title, release, genre, poster }) => {
		const [rows] = await db.execute("UPDATE movies SET title=?, releaseDate=?, genre=?, poster=? WHERE id = ?", [title, releaseDate, genre, poster, id]);
		return rows[0];
	},

	findByTitle: async (title) => {
		const [rows] = await db.execute("SELECT * FROM movies WHERE title = ?", [title]);
		return rows[0];
	},

	getAll: async () => {
		const [rows] = await db.execute("SELECT * FROM movies ");
		return rows;
	},

	getTrending: async () => {
		const [rows] = await db.execute("SELECT * FROM movies ORDER BY id DESC LIMIT 4");
		return rows;
	},

	getByUser: async (userId) => {
		const [rows] = await db.execute("SELECT * FROM movies WHERE user_id=? ", [userId]);
		return rows;
	},
};
