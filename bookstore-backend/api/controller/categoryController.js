// const {executeCreateCategory} = require("./../middlewares/categoryServices.js")
import {executeCreateCategory, executeGetCategory, executeUpdateCategory} from "../services/categoryServices.js";

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

export const updateCategory = async (req, res, next) => {

    const { categoryName,categoryId } = req.body;

    try {
        const updatedData = {
            categoryName,
            categoryId
        };

        const data = await executeUpdateCategory(updatedData);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error updating series:", error);
        res.status(500).json({
            status: "500",
            error: error.message,
        });
    }
};


