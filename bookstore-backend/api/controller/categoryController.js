// const {executeCreateCategory} = require("./../middlewares/categoryServices.js")
import {executeCreateCategory,executeGetCategory} from "../services/categoryServices.js";

export const createCategory = async (req, res, next) => {
    const categoryName = req.body.categoryName

    try {
        const data = await executeCreateCategory(
            categoryName,
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

export const getCategory = async (req, res, next) => {

    try {
        const data = await executeGetCategory(
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
