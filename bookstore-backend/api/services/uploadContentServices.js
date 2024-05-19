import { readLankaFirebaseAppData} from "../utils/firebaseInit.js";// Adjust the import path as necessary

const { readLankaDB, readLankaStorage } = readLankaFirebaseAppData;

export const executeUploadContent = async (category,authorName,episode, bookType, description, price, title, seriesName, imageFile, audioFile, pdfFile) => {
    try {
        const bookCollectionRef = readLankaDB.collection("books");

        // const existingBookSeriesQuerySnapshot = await bookSeriesCollectionRef
        //     .where("title", "==", title)
        //     .get();
        //
        // if (!existingBookSeriesQuerySnapshot.empty) {
        //     throw new Error("Series with the same name already exists.");
        // }

        const bucket = readLankaStorage.bucket();
        const fileUploads = [];

        // Handle image file upload
        if (imageFile) {
            const imageFileName = `${imageFile.originalname}`;
            const imageFilePath = `series_Thumbnail/${imageFileName}`;

            // Check if the image file already exists
            const imageFileExists = await bucket.file(imageFilePath).exists();
            if (imageFileExists[0]) {
                throw new Error("Image file with the same name already exists.");
            }

            const imageFileRef = bucket.file(imageFilePath);
            await imageFileRef.save(imageFile.buffer, {
                metadata: { contentType: imageFile.mimetype },
            });

            const imageUrl = await imageFileRef.getSignedUrl({ action: 'read', expires: '03-09-2491' });
            fileUploads.push({ type: 'thumbnail', url: imageUrl[0] });
        }

        // Handle audio file upload if bookType is 'Audi Book'
        if (bookType === 'Audi Book' && audioFile) {
            const audioFileName = `${audioFile.originalname}`;
            const audioFilePath = `audio/${seriesName}/${audioFileName}`;

            // Check if the audio file already exists
            const audioFileExists = await bucket.file(audioFilePath).exists();
            if (audioFileExists[0]) {
                throw new Error("Audio file with the same name already exists.");
            }

            const audioFileRef = bucket.file(audioFilePath);
            await audioFileRef.save(audioFile.buffer, {
                metadata: { contentType: audioFile.mimetype },
            });

            const audioUrl = await audioFileRef.getSignedUrl({ action: 'read', expires: '03-09-2491' });
            fileUploads.push({ type: 'audio', url: audioUrl[0] });
        }

        // Handle PDF file upload if bookType is 'PDF Book'
        if (bookType === 'PDF Book' && pdfFile) {
            const pdfFileName = `${pdfFile.originalname}`;
            const pdfFilePath = `pdf_Files/${pdfFileName}`;

            // Check if the PDF file already exists
            const pdfFileExists = await bucket.file(pdfFilePath).exists();
            if (pdfFileExists[0]) {
                throw new Error("PDF file with the same name already exists.");
            }

            const pdfFileRef = bucket.file(pdfFilePath);
            await pdfFileRef.save(pdfFile.buffer, {
                metadata: { contentType: pdfFile.mimetype },
            });

            const pdfUrl = await pdfFileRef.getSignedUrl({ action: 'read', expires: '03-09-2491' });
            fileUploads.push({ type: 'pdf', url: pdfUrl[0] });
        }

        const bookSeriesDocRef = await bookCollectionRef.add({
            category: category,
            authorName: authorName,
            bookType: bookType,
            isSeries:bookType =="Audio Book" ? true :false,
            seriesTitle: bookType =="Audio Book" ? seriesName : '',
            description: description,
            episode: bookType =="Audio Book" ?episode:0,
            price: price,
            title: title,
            files: fileUploads,
            createdAt: new Date(),
        });

        const id = bookCollectionRef.id;

        await bookSeriesDocRef.update({
            id: id,
        });

        console.log("Series created successfully with ID:", id);
    } catch (error) {
        console.error("Error executing executeCreateBookSeries:", error);
        throw error;
    }
};
