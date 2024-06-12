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


export const getNewsData = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    try {
        const bookCollectionRef = readLankaFirebaseAppData.readLankaDB.collection("news");

        const snapshot = await bookCollectionRef.get();
        const newsData = [];
        snapshot.forEach(doc => {
            newsData.push(doc.data());
            console.log("newsData================>>>", newsData);
        });

        return res.status(200).json({ data: newsData });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getNewsDataID = async (req, res) => {
    const { id } = req.params; 
    const salt = await bcrypt.genSalt(10);
    try {
        const bookCollectionRef = readLankaFirebaseAppData.readLankaDB.collection("news");

        const snapshot = await bookCollectionRef.doc(id).get(); 
        if (!snapshot.exists) {
            return res.status(404).json({ message: "News not found" });
        }

        const newsData = snapshot.data(); 
        console.log("Selected newsData============>>>>", newsData);
        return res.status(200).json({ data: newsData });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

