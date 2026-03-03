import express, { json } from "express";
import "dotenv/config";
import AuthRoutes from "./routes/auth.routes.js";
import cors from "cors";

const app = express();

app.use(json());
app.use(cors());
app.use("/api/auth", AuthRoutes);

app.listen(process.env.PORT, () => {
	console.log("Server started on http://localhost:" + process.env.PORT);
});
