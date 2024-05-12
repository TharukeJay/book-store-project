import {logger} from "../utils/logger.js";
import express from "express";
import {CheckAuth} from "../middlewares/check-auth.js";
import {createAuthor, getAuthor} from "../controller/BookAuthorController.js";
const router = express.Router();


// Attach routes
router.post("/create-author", logger, createAuthor);
router.post("/get-author", logger, getAuthor);

// Export router
export default router;
