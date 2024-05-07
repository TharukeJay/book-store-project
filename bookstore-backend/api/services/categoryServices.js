import { readLankaFirebaseAppData } from "../utils/firebaseInit.js";

// export const executeCreateCategory = async (name) => {
//     try {
//         const categoryCollectionRef = readLankaFirebaseAppData.readLankaDB.collection("category");
//
//         const categoryDocRef = await categoryCollectionRef.add({
//             categoryName: name,
//             createdAt: new Date(),
//         });
//
//         const categoryId = categoryDocRef.id;
//
//         await categoryDocRef.update({
//             categoryId: categoryId,
//         });
//
//         console.log("Category created successfully with ID:", categoryId);
//     } catch (error) {
//         console.error("Error executing executeCreateCategory:", error);
//         throw error;
//     }
// }

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
