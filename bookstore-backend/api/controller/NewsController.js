import {executeCreateAuthor} from "../services/bookAuthorServices.js";
import {
    executeCreateNews, executeDeleteNews,
    executeGetNews, executeGetSelectedNews,
    executeUpdateNews
} from "../services/newsServices.js";


import multer from 'multer';

const upload = multer();

export const createNews = async (req, res, next) => {
    upload.single('thumbnail')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ status: "400", error: err.message });
        }

        const { newsTitle, description } = req.body;
        const imageFile = req.file;
        console.log('Image File:', req.file);
        try {
            const data = await executeCreateNews(newsTitle, description, imageFile);
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

export const updateNews = async (req, res, next) => {
    upload.single('thumbnail')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ status: "400", error: err.message });
        }

        const { newsId,newsTitle, description } = req.body;
        const imageFile = req.file;

        try {
            const updatedData = {
                newsTitle,
                description
            };

            const data = await executeUpdateNews(newsId, updatedData, imageFile);
            res.status(200).json(data);
        } catch (error) {
            console.error("Error updating news:", error);
            res.status(500).json({
                status: "500",
                error: error.message,
            });
        }
    });
};


export const deleteNews = async (req, res, next) => {
    const { newsId } = req.body;

    try {
        const result = await executeDeleteNews(newsId);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error deleting news:", error);
        res.status(500).json({
            status: "500",
            error: error.message,
        });
    }
};


export const getNews = async (req, res, next) => {
    try {
        const data = await executeGetNews(
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

export const getSelectedNews = async (req, res, next) => {
    const newsID = req.body.newsId
    try {
        console.log('NewsID',req.body.newsId);
        const data = await executeGetSelectedNews(
            newsID,
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