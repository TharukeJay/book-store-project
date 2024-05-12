import {executeCreateAuthor, executeGetAuthor} from "../services/bookAuthorServices.js";


export const createAuthor = async (req, res, next) => {
    const authorName = req.body.authorName
    try {
        const data = await executeCreateAuthor(
            authorName,
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

export const getAuthor = async (req, res, next) => {
    try {
        const data = await executeGetAuthor(
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

