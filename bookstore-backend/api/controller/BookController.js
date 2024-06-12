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

// export const getBookPDF = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const bookCollectionRef = readLankaFirebaseAppData.readLankaDB.collection("books");
//         const snapshot = await bookCollectionRef.doc(id).get(); 
//         if (!snapshot.exists) {
//             return res.status(404).json({ message: "Book not found" });
//         }

//         const bookData = snapshot.data(); 
//         const pdfUrl = bookData.bookFile_url;
//         console.log("bookData ============================>>>>>>>>>", bookData);

//         const pdfResponse = await fetch(pdfUrl);
//         if (!pdfResponse.ok) {
//             throw new Error('Failed to fetch PDF');
//         }

//         const pdfBlob = await pdfResponse.blob();
//         const pdfData = Buffer.from(await pdfBlob.arrayBuffer()).toString('base64');

//         res.status(200).json({ pdfData }); 
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

export const getBookPDF = async (req, res) => {
    const { id } = req.params;
    try {
        const bookCollectionRef = readLankaFirebaseAppData.readLankaDB.collection("books");
        const snapshot = await bookCollectionRef.doc(id).get(); 
        if (!snapshot.exists) {
            return res.status(404).json({ message: "Book not found" });
        }

        const bookData = snapshot.data(); 
        const pdfUrl = bookData.bookFile_url.bookPreviewUrl;
        console.log("bookData ============================>>>>>>>>>", bookData);

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


export const getBookSeriesData = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    try {
        const  bookseriesCollection = readLankaFirebaseAppData.readLankaDB.collection("bookSeries");
        const snapshot = await bookseriesCollection.get();
        const bookSeriesData = [];
        snapshot.forEach(doc=>{
            bookSeriesData.push(doc.data());
            console.log("bookSeriesData============================>>>>", bookSeriesData);
        });
        return res.status(200).json({ data: bookSeriesData });
        } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPrivacyPolicyPdf = async (req, res) => {
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

export const getBookSeriesDataID = async (req, res) => {
    const { id } = req.params; 
    const salt = await bcrypt.genSalt(10);
    try {
        const  bookseriesCollection = readLankaFirebaseAppData.readLankaDB.collection("books");
        const snapshot = await bookseriesCollection.where('seriesId', '==', id).get();
        if (snapshot.empty) {
            return res.status(404).json({ message: "Books not found for the given series ID" });
        }

        const bookData = [];
        snapshot.forEach(doc => {
            bookData.push(doc.data());
        });
        return res.status(200).json({ data: bookData });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
