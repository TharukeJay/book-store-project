import { logger } from "../utils/logger.js";
import { authenticateToken } from "../utils/index.js";
import express from "express";
import {loginUser, registerAdminUser, registerUser} from "../controller/AuthController.js";

const router = express.Router();

const superAdminAndDeveloperOnly = authenticateToken([
    "superadmin",
    "developer",
]);

const adminSuperAdminAndDeveloper = authenticateToken([
    "superadmin",
    "developer",
    "admin",
]);

router.post("/register-admin", logger, registerAdminUser);
router.post("/register", logger, registerUser);
router.post("/login", logger, loginUser);

export default router;
