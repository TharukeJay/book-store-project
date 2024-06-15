import {logger} from "../utils/logger.js";
import express from "express";
import {CheckAuth} from "../middlewares/check-auth.js";
import {createAuthor, getAuthor} from "../controller/BookAuthorController.js";
import {updateAuthor} from "../controller/AuthController.js";
const router = express.Router();


// Attach routes
router.post("/create-author", logger,CheckAuth, createAuthor);
router.post("/get-author", logger,CheckAuth, getAuthor);
router.post("/update-author", logger,CheckAuth, updateAuthor);

// Export router
export default router;
