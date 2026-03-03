import express from "express";
import { register, login, dashboard } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../config/upload.js";

const router = express.Router();

router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.get("/dashboard", authMiddleware, dashboard);

export default router;
