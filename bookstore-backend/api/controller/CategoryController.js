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


export const getCategoryData = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    try {
        const categoryCollectionRef = readLankaFirebaseAppData.readLankaDB.collection("category");

        const snapshot = await categoryCollectionRef.get();
        const categoryData = [];
        snapshot.forEach(doc => {
            categoryData.push(doc.data());
        });

        return res.status(200).json({ data: categoryData });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


