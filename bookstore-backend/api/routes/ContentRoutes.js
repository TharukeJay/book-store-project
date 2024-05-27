import {logger} from "../utils/logger.js";
import express from "express";
import {CheckAuth} from "../middlewares/check-auth.js";
import {uploadContent} from "../controller/contentController.js";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";



const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Attach routes
// router.post("/upload-content", logger, uploadContent);
// router.post('/upload-content', uploadContent);

router.post('/upload-content',upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'audioFile', maxCount: 1 },
    { name: 'pdfFile', maxCount: 1 }
]), uploadContent);


// Export router
export default router;
