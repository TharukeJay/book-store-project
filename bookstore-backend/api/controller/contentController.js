import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import {executeGetContent, executeUploadContent} from "../services/uploadContentServices.js";
import {executeGetCategory} from "../services/categoryServices.js";

//
// // Configure multer for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

const storage = multer.memoryStorage();
const upload = multer({ storage });



export const uploadContent = async (req, res) => {
    const { bookType, categoryName, authorName, chapter, description, bookPrice, bookName, selecteBookSeries, selecteBookSeriesID,} = req.body;

    console.log('print req.body====>', req.body);
    console.log('print req.files====>', req.files);

    let uploadFields = [
        { name: 'thumbnail', maxCount: 1 }
    ];

    if (bookType === 'Audio Book') {
        uploadFields.push({ name: 'audioFile', maxCount: 1 });
    } else if (bookType === 'PDF') {
        uploadFields.push({ name: 'previewPdfFile', maxCount: 1 });
        uploadFields.push({ name: 'fullPdfFile', maxCount: 1 });
    }


    // upload.fields(uploadFields)(req, res, async (err) => {
    //     console.log('print req.body====>', req.body);
    //     console.log('print req.files====>', req.files);
    //     if (err) {
    //         return res.status(400).json({ status: "400", error: err.message });
    //     }

        const imageFile = req.files.thumbnail ? req.files.thumbnail[0] : null;
        const audioFile = bookType === "Audio Book" ? (req.files.audioFile ? req.files.audioFile[0] : null) : null;
        // const pdfFile = bookType === "PDF" ? (req.files.pdfFile ? req.files.pdfFile[0] : null) : null;
        const previewPdfFile = bookType === "PDF" ? (req.files.previewPdfFile ? req.files.previewPdfFile[0] : null) : null;
        const fullPdfFile = bookType === "PDF" ? (req.files.fullPdfFile ? req.files.fullPdfFile[0] : null) : null;

        console.log('Image File:', imageFile);
        console.log('Audio File:', audioFile);
        // console.log('PDF File:', pdfFile);
        console.log('fullPdfFile File:', fullPdfFile);
        console.log('previewPdfFile File:', previewPdfFile);

        try {
            const data = await executeUploadContent(
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
                previewPdfFile,
                fullPdfFile
            );
            res.status(200).json(data);
            console.log('executeUploadContent=== REQ.BODY>', req.body);
        } catch (error) {
            console.error("Error uploading content:", error);
            res.status(500).json({
                status: "500",
                error: error.message,
            });
        }
    // });
};

export const getContent = async (req, res, next) => {

    try {
        const data = await executeGetContent(
        );
        res.status(200).json(data);
        console.log(req.body)
    } catch (error) {
        console.error("Error getting documents:", error);
        res.status(500).json({
            status: "500",
            error: error.message,
        });
    }
}






// import multer from 'multer';
//
// const upload = multer();
//
// export const uploadContent = async (req, res, next) => {
//
//     const { bookType } = req.body;
//
//     let uploadFields = [];
//
//     if (bookType == 'Audio Book') {
//         uploadFields.push({ name: 'audio', maxCount: 1 });
//     } else if (bookType == 'PDF') {
//         uploadFields.push({ name: 'pdf', maxCount: 1 });
//     }
//     uploadFields.push({ name: 'thumbnail', maxCount: 1 });
//
//
//     upload.fields(uploadFields)(req, res, async (err) => {
//         // if (err) {
//         //     return res.status(400).json({ status: "400", error: err.message });
//         // }
//
//         const { category,authorName,chapter, bookType, description, price, title, seriesName } = req.body;
//         const imageFile = req.files.thumbnail ? req.files.thumbnail[0] : null;
//         const audioFile = bookType == "Audio Book" ? (req.files.audio ? req.files.audio[0] : null) : null;
//         const pdfFile = bookType == "PDF" ? (req.files.pdf ? req.files.pdf[0] : null) : null;
//
//         console.log('Image File:', imageFile);
//         console.log('Audio File:', req.files.audio);
//         console.log('PDF File:', req.files.pdf);
//
//         try {
//             const data = await executeUploadContent(category,authorName,chapter, bookType, description, price, title, seriesName, imageFile, audioFile, pdfFile);
//             res.status(200).json(data);
//             console.log('executeUploadContent=== REQ.BODY>',req.body);
//         } catch (error) {
//             console.error("Error getting documents:", error);
//             res.status(500).json({
//                 status: "500",
//                 error: error.message,
//             });
//         }
//     });
// };



// export const uploadContent = async (req, res, next) => {
//
//     const { bookType,category, authorName, chapter, description, price, title, seriesName } = req.body;
//
//     let uploadFields = [
//         { name: 'thumbnail', maxCount: 1 }
//     ];
//
//     if (bookType === 'Audio Book') {
//         uploadFields.push({ name: 'audio', maxCount: 1 });
//     } else if (bookType === 'PDF') {
//         uploadFields.push({ name: 'pdf', maxCount: 1 });
//     }
//
//     upload.fields(uploadFields)(req, res, async (err) => {
//         if (err) {
//             return res.status(400).json({ status: "400", error: err.message });
//         }
//
//         const { category, authorName, chapter, description, price, title, seriesName } = req.body;
//         const imageFile = req.files.thumbnail ? req.files.thumbnail[0] : null;
//         const audioFile = bookType === "Audio Book" ? (req.files.audio ? req.files.audio[0] : null) : null;
//         const pdfFile = bookType === "PDF" ? (req.files.pdf ? req.files.pdf[0] : null) : null;
//
//         console.log('Image File:', imageFile);
//         console.log('Audio File:', audioFile);
//         console.log('PDF File:', pdfFile);
//
//         try {
//             const data = await executeUploadContent(
//                 category,
//                 authorName,
//                 chapter,
//                 bookType,
//                 description,
//                 price,
//                 title,
//                 seriesName,
//                 imageFile,
//                 audioFile,
//                 pdfFile
//             );
//             res.status(200).json(data);
//             console.log('executeUploadContent=== REQ.BODY>', req.body);
//         } catch (error) {
//             console.error("Error getting documents:", error);
//             res.status(500).json({
//                 status: "500",
//                 error: error.message,
//             });
//         }
//     });
// };

