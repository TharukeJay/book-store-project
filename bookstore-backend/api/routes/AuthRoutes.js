import { logger } from "../utils/logger.js";
import { authenticateToken } from "../utils/index.js";
import express from "express";
import {
    handleTokenVerification,
    loginUser,
    registerAdminUser,
    registerUser,
    requestForPasswordResetLink,
} from "../controller/AuthController.js";
// import {
//     getBookData,
//     getBookDataID,
//     getBookPDF
// } from "../controller/BookController.js";
// import {
//     getNewsData,
//     getNewsDataID
// } from "../controller/NewsController.js";
import {CheckAuth} from "../middlewares/check-auth.js";

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
router.post("/verify-token", logger, handleTokenVerification);
router.post(
    "/request-reset-password-link-email",
    logger,
    requestForPasswordResetLink
);
// router.post(
//     "/confirm-reset-password/:token",
//     logger,
//     handlePasswordResetConfirm
// );


export default router;
