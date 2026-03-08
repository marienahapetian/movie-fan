import express, { json } from "express";
import "dotenv/config";
import AuthRoutes from "./routes/auth.routes.js";
import MovieRoutes from "./routes/movie.routes.js";
import cors from "cors";

const app = express();

app.use(json());
app.use(cors());
app.use("/api/auth", AuthRoutes);
app.use("/api/movies", MovieRoutes);
app.use(express.static("public"));

app.listen(process.env.PORT, () => {
	console.log("Server started on http://localhost:" + process.env.PORT);
});
