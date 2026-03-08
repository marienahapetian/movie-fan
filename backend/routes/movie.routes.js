import express from "express";
import { add, getAll, getByUser, getTrending, update } from "../controllers/movie.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../config/upload.js";

const router = express.Router();

router.get("/", getAll);
router.get("/trending", getTrending);
router.get("/mine", authMiddleware, getByUser);
router.post("/add", authMiddleware, upload.single("poster"), add);
router.post("/update", authMiddleware, update);

export default router;
