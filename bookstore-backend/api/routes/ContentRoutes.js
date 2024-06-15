import {logger} from "../utils/logger.js";
import express from "express";
import {CheckAuth} from "../middlewares/check-auth.js";
import {getContent, uploadContent} from "../controller/contentController.js";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
import {getCategory} from "../controller/categoryController.js";



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
    { name: 'previewPdfFile', maxCount: 1 },
    { name: 'fullPdfFile', maxCount: 1 }
]), uploadContent);
router.post("/get-content", logger,CheckAuth, getContent);


// Export router
export default router;
