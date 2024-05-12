import { readLankaFirebaseAppData } from "../utils/firebaseInit.js";


export const executeCreateAuthor = async (name) => {
    try {
        const authorCollectionRef = readLankaFirebaseAppData.readLankaDB.collection("author");

        const existingAuthorQuerySnapshot = await authorCollectionRef
            .where("authorName", "==", name)
            .get();

        if (!existingAuthorQuerySnapshot.empty) {
            throw new Error("Author with the same name already exists.");
        }

        const authorDocRef = await authorCollectionRef.add({
            authorName: name,
            createdAt: new Date(),
        });

        const authorId = authorDocRef.id;

        await authorDocRef.update({
            authorId: authorId,
        });

        console.log("Author created successfully with ID:", authorId);
    } catch (error) {
        console.error("Error executing executeCreateAuthor:", error);
        throw error;
    }
}

export const executeGetAuthor = async (req, res, next) => {
    try {
        const authorCollectionRef = readLankaFirebaseAppData.readLankaDB.collection("author");

        const authorsSnapshot = await authorCollectionRef.get();
        const authors = [];

        authorsSnapshot.forEach((doc) => {
            if (doc.exists) {
                const docData = doc.data();

                authors.push({
                    data: docData
                });
            } else {
                console.error("Document not found:", doc.id);
            }
        });
        return authors;
    } catch (error) {
        console.error("Error getting authors:", error);
        res.status(500).json({
            status: "500",
            error: error.message,
        });
    }
};