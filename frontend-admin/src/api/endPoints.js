import {
    CREATE_AUTHOR, CREATE_BOOK_SERIES,
    CREATE_CATEGORY, DELETE_BOOK_SERIES, GET_AUTHOR, GET_BOOK_SERIES,
    GET_CATEGORY, GET_SELECTED_BOOK_SERIES,
    LOGIN_USER, UPDATE_BOOK_SERIES, UPLOAD_CONTENT,
} from "../configs/commomConfigs";
import API_ENDPOINT from "./httpEndpoint";
import axios from "axios";


export const executeGetCategory = ( ) => {
    return API_ENDPOINT.post(GET_CATEGORY, {
    });
};

export const executeCreateCategory = (categoryName) => {
    return API_ENDPOINT.post(CREATE_CATEGORY, {
        categoryName:categoryName
    });
};

export const executeGetAuthor = ( ) => {
    return API_ENDPOINT.post(GET_AUTHOR, {
    });
};

export const executeCreateAuthor = (authorName) => {
    return API_ENDPOINT.post( CREATE_AUTHOR, {
        authorName:authorName,
    });
};

export const executeCreateBookSeries = async (formData) => {
    try {
        const response = await fetch(CREATE_BOOK_SERIES, {
            method: 'POST',
            body: formData,
        });

        // if (response.ok) {
        //     const data = await response.json();
            return response;
        // } else {
        //     throw new Error(`Error: ${response.status} ${response.statusText}`);
        // }
    } catch (error) {
        console.error("Error creating book series:", error);
        throw error;
    }
};

// export const executeUploadContent = async (category, authorName, chapter, bookType, description, price, title, seriesName, imageFile, audioFile, pdfFile) => {
//     try {
//         console.log('imageFile:', imageFile);
//         console.log('audioFile:', audioFile);
//         console.log('pdfFile:', pdfFile);
//
//         const formData = new FormData();
//         formData.append('category', category);
//         formData.append('authorName', authorName);
//         formData.append('chapter', chapter);
//         formData.append('bookType', bookType);
//         formData.append('description', description);
//         formData.append('price', price);
//         formData.append('title', title);
//         formData.append('seriesName', seriesName);
//
//         // Append files conditionally based on bookType
//         if (imageFile) {
//             formData.append('thumbnail', imageFile);
//         }
//         if (bookType === "Audio Book" && audioFile) {
//             formData.append('audio', audioFile);
//         }
//         if (bookType === "PDF" && pdfFile) {
//             formData.append('pdf', pdfFile);
//         }
//
//         const response = await fetch(UPLOAD_CONTENT, {
//             method: 'POST',
//             body: formData,
//         });
//
//         // if (response.ok) {
//         //     const data = await response.json();
//             return response;
//         // } else {
//         //     throw new Error(`Error: ${response.status} ${response.statusText}`);
//         // }
//     } catch (error) {
//         console.error("Error creating book series:", error);
//         throw error;
//     }
// };



// export const executeUploadContent = async (formData) => {
//     try {
//         const response = await fetch(UPLOAD_CONTENT, {
//             method: 'POST',
//             body: formData,
//         });
//         // if (response.ok) {
//         //     const data = await response.json();
//         return response;
//         // } else {
//         //     throw new Error(`Error: ${response.status} ${response.statusText}`);
//         // }
//     } catch (error) {
//         console.error("Error creating book series:", error);
//         throw error;
//     }
// };

export const executeUploadContent = async (formData) => {
    try {
        const response = await fetch(UPLOAD_CONTENT, {
            method: 'POST',
            body: formData,
        });
        // if (response.ok) {
        //     return await response.json();
            return response;
        // } else {
        //     throw new Error(`Error: ${response.status} ${response.statusText}`);
        // }
    } catch (error) {
        console.error("Error creating book series:", error);
        throw error;
    }
};



// export const executeUploadContent = async (category,authorName,chapter, bookType, description, price, title, seriesName, imageFile, audioFile, pdfFile) => {
//     try {
//         console.log('imageFile===>',imageFile)
//         console.log('audioFile===>',audioFile)
//         console.log('pdfFile===>',pdfFile)
//         const formData = new FormData();
//         formData.append('category', category);
//         formData.append('authorName', authorName);
//         formData.append('chapter', chapter);
//         formData.append('bookType', bookType);
//         formData.append('description', description);
//         formData.append('price', price);
//         formData.append('title', title);
//         formData.append('seriesName', seriesName);
//
//         // Append files conditionally based on bookType
//         if (imageFile) {
//             formData.append('thumbnail', imageFile);
//         }
//         if (bookType == "Audio Book" && audioFile) {
//             formData.append('audio', audioFile);
//         }
//         if (bookType == "PDF" && pdfFile) {
//             formData.append('pdf', pdfFile);
//         }
//
//         // Make the API request
//         const response = await fetch(UPLOAD_CONTENT, {
//             method: 'POST',
//             body: formData,
//         });
//
//         // if (response.ok) {
//         //     const data = await response.json();
//             return response;
//         // } else {
//         //     throw new Error(`Error: ${response.status} ${response.statusText}`);
//         // }
//     } catch (error) {
//         console.error("Error creating book series:", error);
//         throw error;
//     }
// };


export const executeUpdateBookSeries = async (seriesId, authorName, seriesTitle, description, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('seriesId', seriesId);
        formData.append('authorName', authorName);
        formData.append('seriesTitle', seriesTitle);
        formData.append('description', description);
        if (imageFile) {
            formData.append('thumbnail', imageFile);
        }

        const response = await fetch(UPDATE_BOOK_SERIES, {
            method: 'POST',
            body: formData,
        });

        // if (response.ok) {
        //     const data = await response.json();
            return response;
        // } else {
        //     throw new Error(`Error: ${response.status} ${response.statusText}`);
        // }
    } catch (error) {
        console.error("Error updating book series:", error);
        throw error;
    }
};



export const executeGetBookSeries = () => {
    return API_ENDPOINT.post(GET_BOOK_SERIES, {

    });
};

export const executeGetSelectedBookSeries = (seriesId) => {
    return API_ENDPOINT.post(GET_SELECTED_BOOK_SERIES, {
        seriesId: seriesId
    });
};



export const executeDeleteBookSeries = (seriesId) => {
    return API_ENDPOINT.post(DELETE_BOOK_SERIES, {
        seriesId: seriesId
    });
};
