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


export const getBookData = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    try {
        const bookCollectionRef = readLankaFirebaseAppData.readLankaDB.collection("books");
        const snapshot = await bookCollectionRef.get();
        const bookData = [];
        snapshot.forEach(doc => {
            bookData.push(doc.data());
        });

        return res.status(200).json({ data: bookData });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getBookDataID = async (req, res) => {
    const { id } = req.params; 
    const salt = await bcrypt.genSalt(10);
    try {
        const bookCollectionRef = readLankaFirebaseAppData.readLankaDB.collection("books");

        const snapshot = await bookCollectionRef.doc(id).get(); 
        if (!snapshot.exists) {
            return res.status(404).json({ message: "Book not found" });
        }

        const bookData = snapshot.data(); 
        return res.status(200).json({ data: bookData });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getBookPDF = async (req, res) => {
    const { id } = req.params;
    try {
        const bookCollectionRef = readLankaFirebaseAppData.readLankaDB.collection("books");
        const snapshot = await bookCollectionRef.doc(id).get(); 
        if (!snapshot.exists) {
            return res.status(404).json({ message: "Book not found" });
        }

        const bookData = snapshot.data(); 
        const pdfUrl = bookData.file;

        const pdfResponse = await fetch(pdfUrl);
        if (!pdfResponse.ok) {
            throw new Error('Failed to fetch PDF');
        }

        const pdfBlob = await pdfResponse.blob();
        const pdfData = Buffer.from(await pdfBlob.arrayBuffer()).toString('base64');

        res.status(200).json({ pdfData }); 
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};