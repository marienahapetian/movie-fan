# MovieFan

my-fullstack-project

├── backend

│ ├── package.json

│ ├── server.js

│ ├── db.js

│ ├── routes

│ │ └── users.js

│ └── schemas

│ └── userSchema.js

│
├── frontend

│ ├── package.json

│ ├── src

│ │ ├── api

│ │ │ └── axios.js

│ │ ├── components

│ │ │ └── UserForm.jsx

│ │ ├── schemas

│ │ │ └── userSchema.js

│ │ └── App.jsx

│ └── index.js

│
├── style.css

└── index.html

**backend/ → serveur Express + MySQL + Zod**

**frontend/ → React + Axios + React Hook Form + Zod**

**style.css et index.html → interface web (optionnel pour visualisation simple)**

`cd backend`

`npm init -y && npm install express mysql2 zod && npm install -D nodemon`

```json
{
	"type": "module",
	"scripts": {
		"dev": "nodeon server.js"
	}
}
```

# Backend

## backend/db.js

```js
// Importation de mysql2 en version promise pour pouvoir utiliser async/await
import mysql from "mysql2/promise";

// Création d'un pool de connexions vers la base MySQL
export const pool = mysql.createPool({
	host: "localhost", // Adresse du serveur MySQL
	user: "root", // Nom d'utilisateur MySQL
	password: "password", // Mot de passe MySQL
	database: "test", // Nom de la base de données
});

// Le pool permet de gérer plusieurs connexions simultanément et réutilisables
```

## backend/schemas/userSchema.js

```js
// Importation de Zod pour la validation des données
import { z } from "zod";

// Définition du schéma utilisateur
export const userSchema = z.object({
	name: z.string().min(2, "Nom trop court"), // name doit être une string de min 2 caractères
	email: z.string().email("Email invalide"), // email doit être une string au format email valide
});

// Ce schéma sera utilisé pour vérifier les données envoyées par le frontend
```

## backend/routes/users.js

```js
// Importation d'Express pour créer les routes
import express from "express";
// Importation du pool MySQL
import { pool } from "../db.js";
// Importation du schéma Zod pour validation
import { userSchema } from "../schemas/userSchema.js";

// Création d'un router Express (mini-app pour gérer les routes /users)
const router = express.Router();

// Définition de la route POST /users
router.post("/", async (req, res) => {
	// Validation des données envoyées dans req.body
	const result = userSchema.safeParse(req.body);

	// Si les données sont invalides
	if (!result.success) {
		return res.status(400).json(result.error); // On renvoie l'erreur au frontend
	}

	// Extraction des données validées
	const { name, email } = req.body;

	try {
		// Requête préparée pour insérer l'utilisateur dans la base
		await pool.query("INSERT INTO users (name,email) VALUES (?,?)", [name, email]);
		// Réponse JSON confirmant l'ajout
		res.json({ message: "Utilisateur ajouté" });
	} catch (err) {
		console.error(err); // Log côté serveur
		res.status(500).json({ message: "Erreur serveur" }); // Message générique côté client
	}
});

// Exportation du router pour l'utiliser dans server.js
export default router;
```

## backend/server.js

```js
// Importation d'Express pour créer le serveur
import express from "express";
// Importation des routes utilisateurs
import usersRouter from "./routes/users.js";

// Création du serveur Express
const app = express();

// Middleware pour parser automatiquement le JSON dans les requêtes
app.use(express.json());

// Déclaration des routes : toutes les requêtes vers /users utiliseront usersRouter
app.use("/users", usersRouter);

// Route simple pour tester si le serveur fonctionne
app.get("/", (req, res) => {
	res.send("API active");
});

// Lancement du serveur sur le port 3000
app.listen(3000, () => console.log("Serveur démarré sur le port 3000"));
```

# Frontend

`npm create vite@latest frontend -- --teplate react`

`cd frontend/`

`npm install react react-dom react-hook-form zod @hookform/resolvers axios`

## frontend/src/api/axios.js

```js
// Importation d'Axios pour faire des requêtes HTTP
import axios from "axios";

// Création d'une instance Axios personnalisée
export const api = axios.create({
	baseURL: "http://localhost:3000", // URL de base pour toutes les requêtes
	timeout: 5000, // délai maximum avant timeout
	headers: { "Content-Type": "application/json" }, // type de données envoyées
});

// Cette instance permet d'éviter de répéter l'URL et les headers à chaque requête
```

## frontend/src/schemas/userSchema.js

```js
import { z } from "zod";

// Schéma Zod pour validation côté frontend
export const userSchema = z.object({
	name: z.string().min(2, "Nom trop court"), // minimum 2 caractères
	email: z.string().email("Email invalide"), // doit être un email valide
});
```

## frontend/src/components/UserForm.jsx

```jsx
import React from "react"; // Importation de React
import { useForm } from "react-hook-form"; // Importation du hook pour gérer les formulaires
import { zodResolver } from "@hookform/resolvers/zod"; // Pour utiliser Zod comme validateur
import { userSchema } from "../schemas/userSchema"; // Schéma de validation
import { api } from "../api/axios"; // Instance Axios

export default function UserForm() {
	// Initialisation du formulaire avec React Hook Form + Zod
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(userSchema),
	});

	// Fonction appelée quand le formulaire est soumis
	const onSubmit = async (data) => {
		try {
			// Envoi POST via Axios
			const response = await api.post("/users", data);
			alert(response.data.message); // Message succès côté frontend
		} catch (error) {
			alert("Erreur lors de l'envoi des données"); // Message générique côté utilisateur
			console.error(error); // Log détaillé côté console pour dev
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label>Nom:</label>
				<input {...register("name")} /> {/* Liaison input avec React Hook Form */}
				{errors.name && <span>{errors.name.message}</span>} {/* Message d'erreur */}
			</div>
			<div>
				<label>Email:</label>
				<input {...register("email")} />
				{errors.email && <span>{errors.email.message}</span>}
			</div>
			<button type="submit">Envoyer</button>
		</form>
	);
}
```

## frontend/src/App.jsx

```jsx
import React from "react";
import UserForm from "./components/UserForm"; // Import du composant formulaire

function App() {
	return (
		<div>
			<h1>Formulaire Utilisateur</h1>
			<UserForm /> {/* Affichage du formulaire */}
		</div>
	);
}

export default App;
```

# Dans Le Terminal ....

## backend

`cd backend`

`node server.js`

## frontend

`cd frontend`

`npm run start`
