import { v4 as uuidv4 } from 'uuid'; // For generating unique file names
import { readLankaFirebaseAppData} from "../utils/firebaseInit.js";// Adjust the import path as necessary

const { readLankaDB, readLankaStorage } = readLankaFirebaseAppData;

// export const executeCreateBookSeries = async (authorName, seriesTitle, description, imageFile) => {
//     try {
//         const bookSeriesCollectionRef = readLankaDB.collection("bookSeries");
//
//         const existingBookSeriesQuerySnapshot = await bookSeriesCollectionRef
//             .where("seriesTitle", "==", seriesTitle)
//             .get();
//
//         if (!existingBookSeriesQuerySnapshot.empty) {
//             throw new Error("Series with the same name already exists.");
//         }
//
//         // const fileName = `${uuidv4()}-${imageFile.originalname}`;
//         const fileName = `${imageFile.originalname}`;
//         const bucket = readLankaStorage.bucket();
//         const file = bucket.file(fileName);
//
//         const thumbnailFilePath = `series_Thumbnail/${fileName}`;
//         const thumbnailFile = bucket.file(thumbnailFilePath);
//
//         await thumbnailFile.save(imageFile.buffer, {
//             metadata: { contentType: imageFile.mimetype },
//         });
//
//         const imageUrl = await thumbnailFile.getSignedUrl({ action: 'read', expires: '03-09-2491' });
//
//         const bookSeriesDocRef = await bookSeriesCollectionRef.add({
//             authorName: authorName,
//             seriesTitle: seriesTitle,
//             description: description,
//             thumbnail_url: imageUrl[0],
//             createdAt: new Date(),
//         });
//
//         const seriesId = bookSeriesDocRef.id;
//
//         await bookSeriesDocRef.update({
//             seriesId: seriesId,
//         });
//
//         console.log("Series created successfully with ID:", seriesId);
//     } catch (error) {
//         console.error("Error executing executeCreateBookSeries:", error);
//         throw error;
//     }
// };

export const executeCreateBookSeries = async (authorName, seriesTitle, description, imageFile) => {
    try {
        const bookSeriesCollectionRef = readLankaDB.collection("bookSeries");

        const existingBookSeriesQuerySnapshot = await bookSeriesCollectionRef
            .where("seriesTitle", "==", seriesTitle)
            .get();

        if (!existingBookSeriesQuerySnapshot.empty) {
            throw new Error("Series with the same name already exists.");
        }

        const fileName = `${imageFile.originalname}`;
        const existingFilePath = `series_Thumbnail/${fileName}`;

        // Check if the file already exists in Firebase Storage
        const fileExists = await readLankaStorage.bucket().file(existingFilePath).exists();
        if (fileExists[0]) {
            throw new Error("File with the same name already exists.");
        }

        const bucket = readLankaStorage.bucket();
        const thumbnailFilePath = `series_Thumbnail/${fileName}`;
        const thumbnailFile = bucket.file(thumbnailFilePath);

        await thumbnailFile.save(imageFile.buffer, {
            metadata: { contentType: imageFile.mimetype },
        });

        const imageUrl = await thumbnailFile.getSignedUrl({ action: 'read', expires: '03-09-2491' });

        const bookSeriesDocRef = await bookSeriesCollectionRef.add({
            authorName: authorName,
            seriesTitle: seriesTitle,
            description: description,
            thumbnail_url: imageUrl[0],
            createdAt: new Date(),
        });

        const seriesId = bookSeriesDocRef.id;

        await bookSeriesDocRef.update({
            seriesId: seriesId,
        });

        console.log("Series created successfully with ID:", seriesId);
    } catch (error) {
        console.error("Error executing executeCreateBookSeries:", error);
        throw error;
    }
};


// export const executeUpdateBookSeries = async (seriesId, updatedData, imageFile) => {
//     try {
//         const bookSeriesDocRef = readLankaDB.collection("bookSeries").doc(seriesId);
//
//         // Check if the series exists
//         const doc = await bookSeriesDocRef.get();
//         if (!doc.exists) {
//             throw new Error("Series not found.");
//         }
//
//         const existingData = doc.data();
//         let updatedFields = {
//             ...updatedData,
//             updatedAt: new Date(),
//         };
//
//         if (imageFile) {
//             // Delete the existing image if there is one
//             if (existingData.thumbnail_url) {
//                 const existingImagePath = existingData.thumbnail_url.split('/').pop().split('?')[0];
//                 const existingImageFile = readLankaStorage.bucket().file(`series_Thumbnail/${existingImagePath}`);
//                 await existingImageFile.delete();
//             }
//
//             // Generate a unique filename and upload the new image
//             // const fileName = `${uuidv4()}-${imageFile.originalname}`;
//             const fileName = `${imageFile.originalname}`;
//             const bucket = readLankaStorage.bucket();
//             const thumbnailFilePath = `series_Thumbnail/${fileName}`;
//             const thumbnailFile = bucket.file(thumbnailFilePath);
//
//             await thumbnailFile.save(imageFile.buffer, {
//                 metadata: { contentType: imageFile.mimetype },
//             });
//
//             const imageUrl = await thumbnailFile.getSignedUrl({ action: 'read', expires: '03-09-2491' });
//
//             // Add the new image URL to the updated fields
//             updatedFields.thumbnail_url = imageUrl[0];
//         }
//
//         // Update the series document with the new data
//         await bookSeriesDocRef.update(updatedFields);
//
//         console.log("Series updated successfully with ID:", seriesId);
//         return { seriesId, ...updatedFields };
//     } catch (error) {
//         console.error("Error executing executeUpdateBookSeries:", error);
//         throw error;
//     }
// };

export const executeUpdateBookSeries = async (seriesId, updatedData, imageFile) => {
    try {
        const bookSeriesDocRef = readLankaDB.collection("bookSeries").doc(seriesId);

        // Check if the series exists
        const doc = await bookSeriesDocRef.get();
        if (!doc.exists) {
            throw new Error("Series not found.");
        }

        const existingData = doc.data();
        let updatedFields = {
            ...updatedData,
            updatedAt: new Date(),
        };

        if (imageFile) {
            const fileName = `${imageFile.originalname}`;
            const existingFilePath = `series_Thumbnail/${fileName}`;

            // Check if the file already exists in Firebase Storage
            const fileExists = await readLankaStorage.bucket().file(existingFilePath).exists();
            if (fileExists[0]) {
                throw new Error("File with the same name already exists.");
            }

            // Upload the new image if it doesn't exist
            const bucket = readLankaStorage.bucket();
            const thumbnailFilePath = `series_Thumbnail/${fileName}`;
            const thumbnailFile = bucket.file(thumbnailFilePath);

            await thumbnailFile.save(imageFile.buffer, {
                metadata: { contentType: imageFile.mimetype },
            });

            const imageUrl = await thumbnailFile.getSignedUrl({ action: 'read', expires: '03-09-2491' });

            // Add the new image URL to the updated fields
            updatedFields.thumbnail_url = imageUrl[0];
        }

        // Update the series document with the new data
        await bookSeriesDocRef.update(updatedFields);

        console.log("Series updated successfully with ID:", seriesId);
        return { seriesId, ...updatedFields };
    } catch (error) {
        console.error("Error executing executeUpdateBookSeries:", error);
        throw error;
    }
};


export const executeDeleteBookSeries = async (seriesId) => {
    try {
        const bookSeriesDocRef = readLankaDB.collection("bookSeries").doc(seriesId);

        // Check if the series exists
        const doc = await bookSeriesDocRef.get();
        if (!doc.exists) {
            throw new Error("Series not found.");
        }

        const existingData = doc.data();

        // Delete the image from Firebase Storage if it exists
        if (existingData.thumbnail_url) {
            const existingImagePath = existingData.thumbnail_url.split('/').pop().split('?')[0];
            const existingImageFile = readLankaStorage.bucket().file(`series_Thumbnail/${existingImagePath}`);
            await existingImageFile.delete();
        }

        // Delete the series document from Firestore
        await bookSeriesDocRef.delete();

        console.log("Series deleted successfully with ID:", seriesId);
        return { message: "Series deleted successfully" };
    } catch (error) {
        console.error("Error deleting series:", error);
        throw error;
    }
};

export const executeGetBookSeries = async (req, res, next) => {
    try {
        const bookSeriesCollectionRef = readLankaFirebaseAppData.readLankaDB.collection("bookSeries");

        const bookSeriesSnapshot = await bookSeriesCollectionRef.get();
        const bookSeries = [];

        bookSeriesSnapshot.forEach((doc) => {
            if (doc.exists) {
                const docData = doc.data();

                bookSeries.push({
                    data: docData
                });
            } else {
                console.error("Document not found:", doc.id);
            }
        });
        return bookSeries;
    } catch (error) {
        console.error("Error getting authors:", error);
        res.status(500).json({
            status: "500",
            error: error.message,
        });
    }
};

export const executeGetSelectedBookSeries = async (seriesID) => {
    if (!seriesID || typeof seriesID !== 'string') {
        throw new Error("Invalid seriesID. It must be a non-empty string.");
    }

    try {
        const bookSeriesCollectionRef = readLankaFirebaseAppData.readLankaDB.collection("bookSeries");
        const bookSeriesDocRef = bookSeriesCollectionRef.doc(seriesID);

        const doc = await bookSeriesDocRef.get();
        if (doc.exists) {
            const docData = doc.data();
            return { data: docData };
        } else {
            console.error("Document not found:", seriesID);
            return null;
        }
    } catch (error) {
        console.error("Error getting book series:", error);
        throw new Error(error.message);
    }
};

