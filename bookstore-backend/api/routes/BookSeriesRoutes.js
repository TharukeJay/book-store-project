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
router.post("/create-bookSeries", logger,CheckAuth, createBookSeries);
router.post("/update-bookSeries", logger,CheckAuth, updateBookSeries);
router.post("/delete-bookSeries", logger,CheckAuth, deleteBookSeries);
router.post("/get-bookSeries", logger,CheckAuth, getBookSeries);
router.post("/get-selected-bookSeries", logger,CheckAuth, getSelectedBookSeries);

// Export router
export default router;
