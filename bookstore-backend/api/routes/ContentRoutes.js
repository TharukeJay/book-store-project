import {logger} from "../utils/logger.js";
import express from "express";
import {CheckAuth} from "../middlewares/check-auth.js";
import {uploadContent} from "../controller/contentController.js";

const router = express.Router();


// Attach routes
router.post("/upload-content", logger, uploadContent);


// Export router
export default router;
