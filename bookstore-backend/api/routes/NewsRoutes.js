import {logger} from "../utils/logger.js";
import express from "express";
import {CheckAuth} from "../middlewares/check-auth.js";
import {createNews, deleteNews, getNews, getSelectedNews, updateNews} from "../controller/NewsController.js";

const router = express.Router();


// Attach routes
router.post("/create-news", logger,CheckAuth, createNews);
router.get("/get-news", logger,CheckAuth, getNews);
router.post("/update-news", logger,CheckAuth, updateNews);
router.post("/delete-news", logger,CheckAuth, deleteNews);
router.get("/get-selected-news", logger,CheckAuth, getSelectedNews);


// Export router
export default router;
