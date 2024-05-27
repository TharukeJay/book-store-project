import {executeCreateAuthor} from "../services/bookAuthorServices.js";
import {
    executeCreateBookSeries, executeDeleteBookSeries,
    executeGetBookSeries, executeGetSelectedBookSeries,
    executeUpdateBookSeries
} from "../services/bookSeriesServices.js";


import multer from 'multer';

const upload = multer();

export const createBookSeries = async (req, res, next) => {
    upload.single('thumbnail')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ status: "400", error: err.message });
        }

        const { authorName, seriesTitle, description } = req.body;
        const imageFile = req.file;
        console.log('Image File:', req.file);
        try {
            const data = await executeCreateBookSeries(authorName, seriesTitle, description, imageFile);
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

export const updateBookSeries = async (req, res, next) => {
    upload.single('thumbnail')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ status: "400", error: err.message });
        }

        const { seriesId, authorName, seriesTitle, description } = req.body;
        const imageFile = req.file;

        try {
            const updatedData = {
                authorName,
                seriesTitle,
                description
            };

            const data = await executeUpdateBookSeries(seriesId, updatedData, imageFile);
            res.status(200).json(data);
        } catch (error) {
            console.error("Error updating series:", error);
            res.status(500).json({
                status: "500",
                error: error.message,
            });
        }
    });
};


export const deleteBookSeries = async (req, res, next) => {
    const { seriesId } = req.body;

    try {
        const result = await executeDeleteBookSeries(seriesId);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error deleting series:", error);
        res.status(500).json({
            status: "500",
            error: error.message,
        });
    }
};


// export const createBookSeries = async (req, res, next) => {
//     const authorName = req.body.authorName
//     const seriesTitle = req.body.seriesTitle
//     const description = req.body.description
//     const thumbnailUrl = req.body.thumbnail_url
//     try {
//         const data = await executeCreateBookSeries(
//             authorName,
//             seriesTitle,
//             description,
//             thumbnailUrl
//         );
//         res.status(200).json(data);
//         console.log(req.body)
//     } catch (error) {
//         console.error("Error getting documents:", error);
//         res.status(500).json({
//             status: "500",
//             error: error.message,
//         });
//     }
// }

export const getBookSeries = async (req, res, next) => {
    try {
        const data = await executeGetBookSeries(
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

export const getSelectedBookSeries = async (req, res, next) => {
    const seriesID = req.body.seriesId
    try {
        console.log('serieID',req.body.seriesId);
        const data = await executeGetSelectedBookSeries(
            seriesID,
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