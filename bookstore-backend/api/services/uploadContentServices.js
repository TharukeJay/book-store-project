import { readLankaFirebaseAppData} from "../utils/firebaseInit.js";// Adjust the import path as necessary

const { readLankaDB, readLankaStorage } = readLankaFirebaseAppData;


export const executeUploadContent = async (
    categoryName,
    authorName,
    chapter,
    bookType,
    description,
    bookPrice,
    bookName,
    selecteBookSeries,
    selecteBookSeriesID,
    imageFile,
    audioFile,
    pdfFile) => {
    try {
        const bookCollectionRef = readLankaDB.collection("books");
        const bucket = readLankaStorage.bucket();
        const fileUploads = [];
        let imageUrl, audioUrl, pdfUrl;

        // Handle image file upload
        if (imageFile) {
            const imageFileName = `${imageFile.originalname}`;
            const imageFilePath = `book_Thumbnail/${imageFileName}`;

            // Check if the image file already exists
            const imageFileExists = await bucket.file(imageFilePath).exists();
            if (imageFileExists[0]) {
                throw new Error("Image file with the same name already exists.");
            }

            const imageFileRef = bucket.file(imageFilePath);
            await imageFileRef.save(imageFile.buffer, {
                metadata: { contentType: imageFile.mimetype },
            });

            const imageSignedUrl = await imageFileRef.getSignedUrl({ action: 'read', expires: '03-09-2491' });
            imageUrl = imageSignedUrl[0];
            fileUploads.push({ type: 'thumbnail', url: imageUrl });
        }

        // Handle audio file upload if bookType is 'Audio Book'
        if (bookType == "Audio Book" && audioFile) {
            const audioFileName = `${audioFile.originalname}`;
            const audioFilePath = `audio/${selecteBookSeries}/${audioFileName}`;

            // Check if the audio file already exists
            const audioFileExists = await bucket.file(audioFilePath).exists();
            if (audioFileExists[0]) {
                throw new Error("Audio file with the same name already exists.");
            }

            const audioFileRef = bucket.file(audioFilePath);
            await audioFileRef.save(audioFile.buffer, {
                metadata: { contentType: audioFile.mimetype },
            });

            const audioSignedUrl = await audioFileRef.getSignedUrl({ action: 'read', expires: '03-09-2491' });
            audioUrl = audioSignedUrl[0];
            fileUploads.push({ type: 'audio', url: audioUrl });
        }

        // Handle PDF file upload if bookType is 'PDF'
        if (bookType === "PDF" && pdfFile) {
            const pdfFileName = `${pdfFile.originalname}`;
            const pdfFilePath = `pdf/${pdfFileName}`;

            // Check if the PDF file already exists
            const pdfFileExists = await bucket.file(pdfFilePath).exists();
            if (pdfFileExists[0]) {
                throw new Error("PDF file with the same name already exists.");
            }

            const pdfFileRef = bucket.file(pdfFilePath);
            await pdfFileRef.save(pdfFile.buffer, {
                metadata: { contentType: pdfFile.mimetype },
            });

            const pdfSignedUrl = await pdfFileRef.getSignedUrl({ action: 'read', expires: '03-09-2491' });
            pdfUrl = pdfSignedUrl[0];
            fileUploads.push({ type: 'pdf', url: pdfUrl });
        }

        const bookDocRef = await bookCollectionRef.add({
            category: categoryName,
            authorName: authorName,
            bookType: bookType,
            isSeries: bookType === "Audio Book" ? true : false,
            seriesTitle: bookType === "Audio Book" ? selecteBookSeries : '',
            seriesId: bookType === "Audio Book" ? selecteBookSeriesID: '',
            description: description,
            chapter: bookType === "Audio Book" ? chapter : 0,
            price: bookPrice,
            title: bookName,
            thumbnail_url: imageUrl || '',
            bookFile_url: bookType === "Audio Book" ? (audioUrl || '') : (pdfUrl || ''),
            createdAt: new Date(),
        });

        const id = bookDocRef.id;

        await bookDocRef.update({
            id: id,
        });

        console.log("Book created successfully with ID:", id);

        return {
            status: "200",
            message: "Book created successfully",
            data: {
                id: id,
                category: categoryName,
                authorName: authorName,
                bookType: bookType,
                isSeries: bookType === "Audio Book" ? true : false,
                seriesTitle: bookType === "Audio Book" ? selecteBookSeries : '',
                seriesId: bookType === "Audio Book" ? selecteBookSeriesID : '',
                description: description,
                chapter: bookType === "Audio Book" ? chapter : 0,
                price: bookPrice,
                title: bookName,
                thumbnail_url: imageUrl || '',
                bookFile_url: bookType === "Audio Book" ? (audioUrl || '') : (pdfUrl || ''),
                createdAt: new Date(),
            }
        };
    } catch (error) {
        console.error("Error executing executeUploadContent:", error);
        throw error;
    }
};





// export const executeUploadContent = async (category,authorName,chapter, bookType, description, price, title, seriesName, imageFile, audioFile, pdfFile) => {
//     try {
//         const bookCollectionRef = readLankaDB.collection("books");
//
//         // const existingBookSeriesQuerySnapshot = await bookSeriesCollectionRef
//         //     .where("title", "==", title)
//         //     .get();
//         //
//         // if (!existingBookSeriesQuerySnapshot.empty) {
//         //     throw new Error("Series with the same name already exists.");
//         // }
//
//         const bucket = readLankaStorage.bucket();
//         const fileUploads = [];
//
//         // Handle image file upload
//         if (imageFile) {
//             const imageFileName = `${imageFile.originalname}`;
//             const imageFilePath = `book_Thumbnail/${imageFileName}`;
//
//             // Check if the image file already exists
//             const imageFileExists = await bucket.file(imageFilePath).exists();
//             if (imageFileExists[0]) {
//                 throw new Error("Image file with the same name already exists.");
//             }
//
//             const imageFileRef = bucket.file(imageFilePath);
//             await imageFileRef.save(imageFile.buffer, {
//                 metadata: { contentType: imageFile.mimetype },
//             });
//
//             const imageUrl = await imageFileRef.getSignedUrl({ action: 'read', expires: '03-09-2491' });
//             fileUploads.push({ type: 'thumbnail', url: imageUrl[0] });
//         }
//
//         // Handle audio file upload if bookType is 'Audi Book'
//         if (bookType === 'Audi Book' && audioFile) {
//             const audioFileName = `${audioFile.originalname}`;
//             const audioFilePath = `audio/${seriesName}/${audioFileName}`;
//
//             // Check if the audio file already exists
//             const audioFileExists = await bucket.file(audioFilePath).exists();
//             if (audioFileExists[0]) {
//                 throw new Error("Audio file with the same name already exists.");
//             }
//
//             const audioFileRef = bucket.file(audioFilePath);
//             await audioFileRef.save(audioFile.buffer, {
//                 metadata: { contentType: audioFile.mimetype },
//             });
//
//             const audioUrl = await audioFileRef.getSignedUrl({ action: 'read', expires: '03-09-2491' });
//             fileUploads.push({ type: 'audio', url: audioUrl[0] });
//         }
//
//         // Handle PDF file upload if bookType is 'PDF Book'
//         if (bookType === 'PDF Book' && pdfFile) {
//             const pdfFileName = `${pdfFile.originalname}`;
//             const pdfFilePath = `pdf/${pdfFileName}`;
//
//             // Check if the PDF file already exists
//             const pdfFileExists = await bucket.file(pdfFilePath).exists();
//             if (pdfFileExists[0]) {
//                 throw new Error("PDF file with the same name already exists.");
//             }
//
//             const pdfFileRef = bucket.file(pdfFilePath);
//             await pdfFileRef.save(pdfFile.buffer, {
//                 metadata: { contentType: pdfFile.mimetype },
//             });
//
//             const pdfUrl = await pdfFileRef.getSignedUrl({ action: 'read', expires: '03-09-2491' });
//             fileUploads.push({ type: 'pdf', url: pdfUrl[0] });
//         }
//
//         const bookSeriesDocRef = await bookCollectionRef.add({
//             category: category,
//             authorName: authorName,
//             bookType: bookType,
//             isSeries:bookType =="Audio Book" ? true :false,
//             seriesTitle: bookType =="Audio Book" ? seriesName : '',
//             description: description,
//             chapter: bookType =="Audio Book" ?chapter:0,
//             price: price,
//             title: title,
//             thumbnail_url:imageUrl[0],
//             bookFile_url:bookType =="Audio Book" ? audioUrl[0] : pdfUrl[0],
//             createdAt: new Date(),
//         });
//
//         const id = bookCollectionRef.id;
//
//         await bookSeriesDocRef.update({
//             id: id,
//         });
//
//         console.log("Series created successfully with ID:", id);
//     } catch (error) {
//         console.error("Error executing executeCreateBookSeries:", error);
//         throw error;
//     }
// };
