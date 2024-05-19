import {logger} from "../utils/logger.js";
import express from "express";
import {CheckAuth} from "../middlewares/check-auth.js";
import {
    createBookSeries,
    deleteBookSeries,
    getBookSeries, getSelectedBookSeries,
    updateBookSeries
} from "../controller/BookSeriesController.js";
const router = express.Router();


// Attach routes
router.post("/create-bookSeries", logger, createBookSeries);
router.post("/update-bookSeries", logger, updateBookSeries);
router.post("/delete-bookSeries", logger, deleteBookSeries);
router.post("/get-bookSeries", logger, getBookSeries);
router.post("/get-selected-bookSeries", logger, getSelectedBookSeries);

// Export router
export default router;
