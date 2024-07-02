import {
    CREATE_AUTHOR,
    CREATE_BOOK_SERIES,
    CREATE_CATEGORY,
    CREATE_NEWS, CREATE_NEWS_CATEGORY,
    DELETE_AUTHOR,
    DELETE_BOOK_SERIES,
    DELETE_CATEGORY,
    DELETE_NEWS, DELETE_NEWS_CATEGORY,
    GET_AUTHOR,
    GET_BOOK_SERIES,
    GET_CATEGORY,
    GET_CONTENT,
    GET_NEWS, GET_NEWS_CATEGORY,
    GET_SELECTED_BOOK_SERIES,
    GET_SELECTED_NEWS,
    GET_USERS,
    LOGIN_USER,
    SET_ADMIN,
    UPDATE_AUTHOR,
    UPDATE_BOOK_SERIES,
    UPDATE_CATEGORY,
    UPDATE_NEWS, UPDATE_NEWS_CATEGORY,
    UPLOAD_CONTENT,
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

export const executeGetContent = ( ) => {
    return API_ENDPOINT.post(GET_CONTENT, {
    });
};


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

export const executeCreateNews = async (formData) => {
    try {
        const response = await fetch(CREATE_NEWS, {
            method: 'POST',
            body: formData,
        });

        return response;

    } catch (error) {
        console.error("Error creating book series:", error);
        throw error;
    }
};
export const executeUpdateNews = async (newsId,newsTitle,newsCategory, description, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('newsId', newsId);
        formData.append('newsCategory', newsCategory);
        formData.append('newsTitle', newsTitle);
        formData.append('description', description);
        if (imageFile) {
            formData.append('thumbnail', imageFile);
        }

        const response = await fetch(UPDATE_NEWS, {
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



export const executeGetNews = () => {
    return API_ENDPOINT.get( GET_NEWS, {

    });
};

export const executeGetSelectedNews = (newsId) => {
    return API_ENDPOINT.get(GET_SELECTED_NEWS, {
        newsId: newsId
    });
};



export const executeDeleteNews = (newsId) => {
    return API_ENDPOINT.post(DELETE_NEWS, {
        newsId: newsId
    });
};


export const executeGetUsers = ( ) => {
    return API_ENDPOINT.get(GET_USERS, {
    });
};

export const executeSetAdmin = (userId,isAdmin) => {
    return API_ENDPOINT.post(SET_ADMIN, {
        userId: userId,
        isAdmin:isAdmin
    });
};

export const executeUpdateCategory = async (categoryId,categoryName) => {
    return API_ENDPOINT.post(UPDATE_CATEGORY, {
        categoryId: categoryId,
        categoryName:categoryName
    });
};

export const executeDeleteCategory = (categoryId) => {
    return API_ENDPOINT.post(DELETE_CATEGORY, {
        categoryId: categoryId,
    });
};

export const executeUpdateAuthor = async (authorId,authorName) => {
    return API_ENDPOINT.post(UPDATE_AUTHOR, {
        authorId: authorId,
        authorName:authorName
    });
};

export const executeDeleteAuthor = (authorId) => {
    return API_ENDPOINT.post(DELETE_AUTHOR, {
        authorId: authorId,
    });
};

export const executeGetNewsCategory = ( ) => {
    return API_ENDPOINT.post(GET_NEWS_CATEGORY, {
    });
};

export const executeCreateNewsCategory = (categoryName) => {
    return API_ENDPOINT.post(CREATE_NEWS_CATEGORY, {
        categoryName:categoryName
    });
};

export const executeUpdateNewsCategory = async (categoryId,categoryName) => {
    return API_ENDPOINT.post(UPDATE_NEWS_CATEGORY, {
        categoryId: categoryId,
        categoryName:categoryName
    });
};

export const executeDeleteNewsCategory = (categoryId) => {
    return API_ENDPOINT.post(DELETE_NEWS_CATEGORY, {
        categoryId: categoryId,
    });
};