import express from "express";
import { logger } from "../utils/logger.js";
import {
    getPrivacyPdf,
} from "../controller/PrivacyController.js";

const router = express.Router();

router.get("/get-privacy", getPrivacyPdf); 

export default router;
