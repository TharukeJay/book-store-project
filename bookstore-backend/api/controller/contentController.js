
import multer from 'multer';
import {executeUploadContent} from "../services/uploadContentServices.js";

const upload = multer();

export const uploadContent = async (req, res, next) => {

    const { bookType } = req.body;

    let uploadFields = [];
    if (bookType === 'Audio Book') {
        uploadFields.push({ name: 'audio', maxCount: 1 });
    } else if (bookType === 'PDF') {
        uploadFields.push({ name: 'pdf', maxCount: 1 });
    }
    uploadFields.push({ name: 'thumbnail', maxCount: 1 });


    upload.fields(uploadFields)(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ status: "400", error: err.message });
        }

        const { category, bookType,authorName,episode, description, price, title, seriesName } = req.body;
        const imageFile = req.files.thumbnail ? req.files.thumbnail[0] : null;
        const audioFile = bookType === 'Audi Book' ? (req.files.audio ? req.files.audio[0] : null) : null;
        const pdfFile = bookType === 'PDF Book' ? (req.files.pdf ? req.files.pdf[0] : null) : null;

        console.log('Image File:', imageFile);
        console.log('Audio File:', audioFile);
        console.log('PDF File:', pdfFile);

        try {
            const data = await executeUploadContent(category, bookType,authorName,episode, description, price, title, seriesName, imageFile, audioFile, pdfFile);
            res.status(200).json(data);
            console.log(req.body);
        } catch (error) {
            console.error("Error getting documents:", error);
            res.status(500).json({
                status: "500",
                error: error.message,
            });
        }
    });
};