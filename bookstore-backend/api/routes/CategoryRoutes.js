import {logger} from "../utils/logger.js";
import express from "express";
import {createCategory, getCategory} from "../controller/categoryController.js";
import {CheckAuth} from "../middlewares/check-auth.js";
// import createCategory  from "./../controller/category";
const router = express.Router();

// const createCategory = require("./../controller/category");


// Attach routes
router.post("/create-category", logger, createCategory);
router.post("/get-category", logger, getCategory);

// Export router
export default router;
