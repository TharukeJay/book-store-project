import { readLankaFirebaseAppData } from "../utils/firebaseInit.js";
import {executeUpdateBookSeries} from "./bookSeriesServices.js";


export const executeCreateCategory = async (name) => {
    try {
        const categoryCollectionRef = readLankaFirebaseAppData.readLankaDB.collection("category");

        const existingCategoryQuerySnapshot = await categoryCollectionRef
            .where("categoryName", "==", name)
            .get();

        if (!existingCategoryQuerySnapshot.empty) {
            throw new Error("Category with the same name already exists.");
        }

        const categoryDocRef = await categoryCollectionRef.add({
            categoryName: name,
            createdAt: new Date(),
        });

        const categoryId = categoryDocRef.id;

        await categoryDocRef.update({
            categoryId: categoryId,
        });

        console.log("Category created successfully with ID:", categoryId);
    } catch (error) {
        console.error("Error executing executeCreateCategory:", error);
        throw error;
    }
}

export const executeGetCategory = async (req, res, next) => {
    try {
        const categoryCollectionRef = readLankaFirebaseAppData.readLankaDB.collection("category");

        const categoriesSnapshot = await categoryCollectionRef.get();
        const categories = [];

        categoriesSnapshot.forEach((doc) => {
            if (doc.exists) {
                const docData = doc.data();

                categories.push({
                    data: docData
                });
            } else {
                console.error("Document not found:", doc.id);
            }
        });
        return categories;
    } catch (error) {
        console.error("Error getting categories:", error);
        res.status(500).json({
            status: "500",
            error: error.message,
        });
    }
};

export const executeUpdateCategory = async (updatedData) => {
    try {
        const categoryDocRef = readLankaFirebaseAppData.readLankaDB.collection("category").doc(updatedData.categoryId);

        // Check if the series exists
        const doc = await categoryDocRef.get();
        if (!doc.exists) {
            throw new Error("Category not found.");
        }

        const existingData = doc.data();
        let updatedFields = {
            categoryName:updatedData.categoryName,
            updatedAt: new Date(),
        };


        // Update the series document with the new data
        await categoryDocRef.update(updatedFields);

        console.log("Category updated successfully with ID:", updatedData.categoryId);
        let categoryId=updatedData.categoryId;
        return { categoryId, ...updatedFields };
    } catch (error) {
        console.error("Error executing categoryId:", error);
        throw error;
    }
};

