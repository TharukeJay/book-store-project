import express from "express";
import { logger } from "../utils/logger.js";
import {
    getBookData,
    getBookDataID,
    getBookPDF,
    getBookSeriesData,
    getBookSeriesDataID,
    saveListningAudio,
    getListningAudio,
    getPrivacyPolicyPdf,
} from "../controller/BookController.js";
import {
    getNewsData,
    getNewsDataID
} from "../controller/NewsController.js";
import {
    getCategoryData
} from "../controller/CategoryController.js";
import {CheckAuth} from "../middlewares/check-auth.js";

const router = express.Router();

// PDF -----------
router.get("/get-data", logger, getBookData); 
router.get("/read-book/:id", logger, getBookDataID);
router.get("/read-book-pdf/:id",logger, CheckAuth, getBookPDF);
router.get("/get-privacy-pdf", logger, getPrivacyPolicyPdf); 

//  Audio Books 
router.get("/get-data-series", logger, getBookSeriesData); 
router.get("/get-audio-book/:id", logger, getBookSeriesDataID); 
router.post("/audio-progress", logger, saveListningAudio); 
router.get("/audio-progress/:userId/:seriesAudioId", logger, getListningAudio); 

//  News & Feature
router.get("/get-news", logger, getNewsData);
router.get("/read-news/:id", logger, getNewsDataID);

//category
router.get("/get-category", logger, getCategoryData); 
export default router;