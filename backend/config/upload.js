import multer from "multer";
import path from "path";

// le stockage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/uploads/");
	},
	filename: (req, file, cb) => {
		const uniquename = Date.now();
		cb(null, uniquename + path.extname(file.originalname));
	},
});

// le filtrage des types
const fileFilter = (req, file, cb) => {
	const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error("Error: file format not allowed"), null);
	}
};

export const upload = multer({
	storage,
	fileFilter,
	limits: {
		fileSize: 2 * 1024 * 1024, // 2MB
	},
});
