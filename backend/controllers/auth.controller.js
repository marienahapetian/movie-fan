import argon2 from "argon2";
import { upload } from "../config/upload.js";
import { UserModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const existing_user = await UserModel.findByEmail(email);
		if (!existing_user) return res.status(401).json({ message: "Incorrect credentials" });

		if (!(await argon2.verify(existing_user.password, password))) return res.status(401).json({ message: "Incorrect credentials" });

		const token = jwt.sign({ email, password }, process.env.JWT_SECRET, { expiresIn: "1h" });
		return res.status(200).json({ token });
	} catch (error) {
		return res.status(500).json({ message: "Smth went wrong" });
	}
};

export const register = async (req, res) => {
	try {
		const { email, password } = req.body;
		const avatar = req.file;

		const existing_user = await UserModel.findByEmail(email);
		if (existing_user) return res.status(400).json({ message: "User already exists" });

		const hashed = await argon2.hash(password);
		// upload(avatar);

		const userId = await UserModel.create({ email, password: hashed, avatar: avatar?.filename || null });
		return res.status(201).json({ message: "User created", userId });
	} catch (error) {
		return res.status(500).json({ message: "Smth went wrong" });
	}
};

export const dashboard = () => {};
