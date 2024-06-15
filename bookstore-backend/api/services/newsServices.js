import { v4 as uuidv4 } from 'uuid'; // For generating unique file names
import { readLankaFirebaseAppData} from "../utils/firebaseInit.js";
import {getSelectedNews} from "../controller/NewsController.js";
// Adjust the import path as necessary

const { readLankaDB, readLankaStorage } = readLankaFirebaseAppData;

export const executeCreateNews = async (newsTitle, description, imageFile) => {
    try {
        const newsCollectionRef = readLankaDB.collection("news");

        const existingNewsQuerySnapshot = await newsCollectionRef
            .where("newsTitle", "==", newsTitle)
            .get();

        if (!existingNewsQuerySnapshot.empty) {
            throw new Error("news with the same name already exists.");
        }

        const fileName = `${imageFile.originalname}`;
        const existingFilePath = `news_Thumbnail/${fileName}`;

        // Check if the file already exists in Firebase Storage
        const fileExists = await readLankaStorage.bucket().file(existingFilePath).exists();
        if (fileExists[0]) {
            throw new Error("File with the same name already exists.");
        }

        const bucket = readLankaStorage.bucket();
        const thumbnailFilePath = `news_Thumbnail/${fileName}`;
        const thumbnailFile = bucket.file(thumbnailFilePath);

        await thumbnailFile.save(imageFile.buffer, {
            metadata: { contentType: imageFile.mimetype },
        });

        const imageUrl = await thumbnailFile.getSignedUrl({ action: 'read', expires: '03-09-2491' });

        const newsDocRef = await newsCollectionRef.add({
            newsTitle: newsTitle,
            description: description,
            thumbnail_url: imageUrl[0],
            createdAt: new Date(),
        });

        const newsId = newsDocRef.id;

        await newsDocRef.update({
            newsId: newsId,
        });

        console.log("News created successfully with ID:", newsId);
    } catch (error) {
        console.error("Error executing executeCreateNews:", error);
        throw error;
    }
};


export const executeUpdateNews = async (newsId, updatedData, imageFile) => {
    try {
        const newsDocRef = readLankaDB.collection("news").doc(newsId);

        // Check if the News exists
        const doc = await newsDocRef.get();
        if (!doc.exists) {
            throw new Error("News not found.");
        }

        const existingData = doc.data();
        let updatedFields = {
            ...updatedData,
            updatedAt: new Date(),
        };

        if (imageFile) {
            const fileName = `${imageFile.originalname}`;
            const existingFilePath = `news_Thumbnail/${fileName}`;

            // Check if the file already exists in Firebase Storage
            const fileExists = await readLankaStorage.bucket().file(existingFilePath).exists();
            if (fileExists[0]) {
                throw new Error("File with the same name already exists.");
            }

            // Upload the new image if it doesn't exist
            const bucket = readLankaStorage.bucket();
            const thumbnailFilePath = `news_Thumbnail/${fileName}`;
            const thumbnailFile = bucket.file(thumbnailFilePath);

            await thumbnailFile.save(imageFile.buffer, {
                metadata: { contentType: imageFile.mimetype },
            });

            const imageUrl = await thumbnailFile.getSignedUrl({ action: 'read', expires: '03-09-2491' });

            // Add the new image URL to the updated fields
            updatedFields.thumbnail_url = imageUrl[0];
        }

        // Update the news document with the new data
        await newsDocRef.update(updatedFields);

        console.log("News updated successfully with ID:", newsId);
        return { newsId, ...updatedFields };
    } catch (error) {
        console.error("Error executing executeUpdateBookNews:", error);
        throw error;
    }
};


export const executeDeleteNews = async (newsId) => {
    try {
        const newsDocRef = readLankaDB.collection("news").doc(newsId);

        // Check if the news exists
        const doc = await newsDocRef.get();
        if (!doc.exists) {
            throw new Error("news not found.");
        }

        const existingData = doc.data();

        // Delete the image from Firebase Storage if it exists
        if (existingData.thumbnail_url) {
            const existingImagePath = existingData.thumbnail_url.split('/').pop().split('?')[0];
            const existingImageFile = readLankaStorage.bucket().file(`news_Thumbnail/${existingImagePath}`);
            await existingImageFile.delete();
        }

        // Delete the news document from Firestore
        await newsDocRef.delete();

        console.log("news deleted successfully with ID:", newsId);
        return { message: "news deleted successfully" };
    } catch (error) {
        console.error("Error deleting news:", error);
        throw error;
    }
};

export const executeGetNews = async (req, res, next) => {
    try {
        const newsCollectionRef = readLankaFirebaseAppData.readLankaDB.collection("news");

        const newsSnapshot = await newsCollectionRef.get();
        const news = [];

        newsSnapshot.forEach((doc) => {
            if (doc.exists) {
                const docData = doc.data();

                news.push({
                    data: docData
                });
            } else {
                console.error("Document not found:", doc.id);
            }
        });
        return news;
    } catch (error) {
        console.error("Error getting authors:", error);
        res.status(500).json({
            status: "500",
            error: error.message,
        });
    }
};

export const executeGetSelectedNews = async (newsID) => {
    if (!newsID || typeof newsID !== 'string') {
        throw new Error("Invalid newsID. It must be a non-empty string.");
    }

    try {
        const newsCollectionRef = readLankaFirebaseAppData.readLankaDB.collection("news");
        const newsDocRef = newsCollectionRef.doc(newsID);

        const doc = await newsDocRef.get();
        if (doc.exists) {
            const docData = doc.data();
            return { data: docData };
        } else {
            console.error("Document not found:", newsID);
            return null;
        }
    } catch (error) {
        console.error("Error getting book series:", error);
        throw new Error(error.message);
    }
};

