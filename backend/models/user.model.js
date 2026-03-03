import { db } from "../config/db.js";

export const UserModel = {
	create: async ({ email, password, avatar }) => {
		const [result] = await db.execute("INSERT INTO users (email, password, avatar) VALUES (?, ?, ?)", [email, password, avatar]);
		return result.insertId;
	},

	findByEmail: async (email) => {
		const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
		return rows[0];
	},

	findById: async (id) => {
		const [rows] = await db.execute("SELECT id, email, avatar, created_at FROM users WHERE id = ?", [id]);
		return rows[0];
	},
};
