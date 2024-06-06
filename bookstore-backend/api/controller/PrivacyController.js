import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    generateTempPasword,
    updateLastSeen,
    verifyToken,
} from "../utils/index.js";
import { generateRefreshToken, generateToken } from "../utils/token.js";
import  { readLankaFirebaseAppData } from "../utils/firebaseInit.js"
import { v4 as uuidv4 } from 'uuid';
import {sendPasswordResetEmail} from "../utils/resetPasswordLink.js";


export const getPrivacyPdf = async (req, res) => {
    try {
        console.log('Fetching PDF...');

        const pdfUrl = 'https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/pdf%2Fprivacy%2F%E0%B6%9A%E0%B7%9C%E0%B6%B4%E0%B7%92%E0%B6%BB%E0%B6%BA%E0%B7%92%E0%B6%A7%E0%B7%8A%E0%B7%83%E0%B7%8A.pdf?alt=media&token=2b8291fd-6102-45e8-ab67-5298a3932c82';
        const response = await fetch(pdfUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch the PDF');
        }

        const arrayBuffer = await response.arrayBuffer();
        const pdfData = Buffer.from(arrayBuffer).toString('base64');

        console.log("getPrivacyPolicyPdf =====>>> ", pdfData);
        res.status(200).json({ pdfData });
    } catch (error) {
        console.error('Error fetching PDF:', error);
        res.status(500).json({ message: error.message });
    }
};