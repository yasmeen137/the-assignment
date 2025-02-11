import multer from "multer";
import path from "path";
import fs from "fs";

// Define upload folder path
const UPLOADS_FOLDER = path.join(__dirname, "../../uploads");

// Ensure the uploads directory exists
if (!fs.existsSync(UPLOADS_FOLDER)) {
  fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

export default upload;