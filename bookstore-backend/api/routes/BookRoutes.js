import express from "express";
import { logger } from "../utils/logger.js";
import {
    getBookData,
    getBookDataID,
    getBookPDF
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

router.get("/get-data", logger, getBookData); 
router.get("/read-book/:id", logger, getBookDataID);
router.get("/read-book-pdf/:id",logger, CheckAuth, getBookPDF);

router.get("/get-news", logger, getNewsData);
router.get("/read-news/:id", logger,CheckAuth, getNewsDataID);

//category
router.get("/get-category", logger, getCategoryData); 
export default router;