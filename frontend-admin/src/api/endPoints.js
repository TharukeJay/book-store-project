import {
    CREATE_AUTHOR,
    CREATE_BOOK_SERIES,
    CREATE_CATEGORY,
    CREATE_NEWS, CREATE_NEWS_CATEGORY, CREATE_NEWS_STRIPT, CREATE_PICTURE_RIM,
    DELETE_AUTHOR,
    DELETE_BOOK_SERIES,
    DELETE_CATEGORY, DELETE_CONTENT,
    DELETE_NEWS, DELETE_NEWS_CATEGORY, DELETE_NEWS_STRIPT, DELETE_PICTURE_RIM,
    GET_AUTHOR,
    GET_BOOK_SERIES,
    GET_CATEGORY,
    GET_CONTENT,
    GET_NEWS, GET_NEWS_CATEGORY, GET_NEWS_STRIPT, GET_PICTURE_RIM,
    GET_SELECTED_BOOK_SERIES,
    GET_SELECTED_NEWS,
    GET_USERS,
    LOGIN_USER, REQUEST_RESET_PASSWORD,
    SET_ADMIN,
    UPDATE_AUTHOR,
    UPDATE_BOOK_SERIES,
    UPDATE_CATEGORY, UPDATE_CONTENT,
    UPDATE_NEWS, UPDATE_NEWS_CATEGORY, UPDATE_NEWS_STRIPT, UPDATE_PICTURE_RIM,
    UPLOAD_CONTENT,
} from "../configs/commomConfigs";
import API_ENDPOINT from "./httpEndpoint";

//
//
// export const executeGetCategory = ( ) => {
//     return API_ENDPOINT.post(GET_CATEGORY, {
//     });
// };
//
// // export const executeCreateCategory = async (formData) => {
// //     try {
// //         const response = await fetch(CREATE_CATEGORY, {
// //             method: 'POST',
// //             body: formData,
// //         });
// //         return response;
// //     } catch (error) {
// //         console.error("Error creating book series:", error);
// //         throw error;
// //     }
// // };
//
// export const executeCreateCategory = async (formData) => {
//     try {
//         const response = await API_ENDPOINT.post(CREATE_CATEGORY, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//         return response;
//     } catch (error) {
//         console.error("Error creating category:", error);
//         throw error;
//     }
// };
//
// export const executeGetAuthor = ( ) => {
//     return API_ENDPOINT.post(GET_AUTHOR, {
//     });
// };
//
// export const executeCreateAuthor = (authorName) => {
//     return API_ENDPOINT.post( CREATE_AUTHOR, {
//         authorName:authorName,
//     });
// };
//
// export const executeCreateBookSeries = async (formData) => {
//     try {
//         const response = await fetch(CREATE_BOOK_SERIES, {
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
//
//
// export const executeUploadContent = async (formData) => {
//     try {
//         const response = await fetch(UPLOAD_CONTENT, {
//             method: 'POST',
//             body: formData,
//         });
//         // if (response.ok) {
//         //     return await response.json();
//             return response;
//         // } else {
//         //     throw new Error(`Error: ${response.status} ${response.statusText}`);
//         // }
//     } catch (error) {
//         console.error("Error creating book series:", error);
//         throw error;
//     }
// };
//
// export const executeUpdateContent = async (formData) => {
//     try {
//         const response = await fetch(UPDATE_CONTENT, {
//             method: 'POST',
//             body: formData,
//         });
//         return response;
//     } catch (error) {
//         console.error("Error creating book series:", error);
//         throw error;
//     }
// };
//
// export const executeGetContent = ( ) => {
//     return API_ENDPOINT.post(GET_CONTENT, {
//     });
// };
//
//
// export const executeUpdateBookSeries = async (seriesId, authorName, seriesTitle, description, imageFile,seriesPrice,audioFile,chapterLimit) => {
//     try {
//         const formData = new FormData();
//         formData.append('seriesId', seriesId);
//         formData.append('authorName', authorName);
//         formData.append('seriesTitle', seriesTitle);
//         formData.append('description', description);
//         formData.append('seriesPrice', seriesPrice);
//         formData.append('chapterLimit', chapterLimit);
//         if (imageFile) {
//             formData.append('thumbnail', imageFile);
//         }
//         if (audioFile) {
//             formData.append('audioFile', audioFile);
//         }
//
//         const response = await fetch(UPDATE_BOOK_SERIES, {
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
//         console.error("Error updating book series:", error);
//         throw error;
//     }
// };
//
//
//
// export const executeGetBookSeries = () => {
//     return API_ENDPOINT.post(GET_BOOK_SERIES, {
//
//     });
// };
//
// export const executeGetSelectedBookSeries = (seriesId) => {
//     return API_ENDPOINT.post(GET_SELECTED_BOOK_SERIES, {
//         seriesId: seriesId
//     });
// };
//
//
//
// export const executeDeleteBookSeries = (seriesId) => {
//     return API_ENDPOINT.post(DELETE_BOOK_SERIES, {
//         seriesId: seriesId
//     });
// };
//
// export const executeCreateNews = async (formData) => {
//     try {
//         const response = await fetch(CREATE_NEWS, {
//             method: 'POST',
//             body: formData,
//         });
//
//         return response;
//
//     } catch (error) {
//         console.error("Error creating book series:", error);
//         throw error;
//     }
// };
// export const executeUpdateNews = async (newsId,newsTitle,newsCategory, description, imageFile) => {
//     try {
//         const formData = new FormData();
//         formData.append('newsId', newsId);
//         formData.append('newsCategory', newsCategory);
//         formData.append('newsTitle', newsTitle);
//         formData.append('description', description);
//         if (imageFile) {
//             formData.append('thumbnail', imageFile);
//         }
//
//         const response = await fetch(UPDATE_NEWS, {
//             method: 'POST',
//             body: formData,
//         });
//
//         // if (response.ok) {
//         //     const data = await response.json();
//         return response;
//         // } else {
//         //     throw new Error(`Error: ${response.status} ${response.statusText}`);
//         // }
//     } catch (error) {
//         console.error("Error updating book series:", error);
//         throw error;
//     }
// };
//
//
//
// export const executeGetNews = () => {
//     return API_ENDPOINT.get( GET_NEWS, {
//
//     });
// };
//
// export const executeGetSelectedNews = (newsId) => {
//     return API_ENDPOINT.get(GET_SELECTED_NEWS, {
//         newsId: newsId
//     });
// };
//
//
//
// export const executeDeleteNews = (newsId) => {
//     return API_ENDPOINT.post(DELETE_NEWS, {
//         newsId: newsId
//     });
// };
//
//
// export const executeGetUsers = ( ) => {
//     return API_ENDPOINT.get(GET_USERS, {
//     });
// };
//
// export const executeSetAdmin = (userId,isAdmin) => {
//     return API_ENDPOINT.post(SET_ADMIN, {
//         userId: userId,
//         isAdmin:isAdmin
//     });
// };
//
// // export const executeUpdateCategory = async (categoryId,categoryName,imageFile) => {
// //     return API_ENDPOINT.post(UPDATE_CATEGORY, {
// //         categoryId: categoryId,
// //         categoryName:categoryName
// //     });
// // };
//
// export const executeUpdateCategory = async (categoryId,categoryName,imageFile) => {
//     try {
//         const formData = new FormData();
//         formData.append('categoryId', categoryId);
//         formData.append('categoryName', categoryName);
//         if (imageFile) {
//             formData.append('thumbnail', imageFile);
//         }
//
//         const response = await fetch(UPDATE_CATEGORY, {
//             method: 'POST',
//             body: formData,
//         });
//         return response;
//     } catch (error) {
//         console.error("Error updating book series:", error);
//         throw error;
//     }
// };
//
// export const executeDeleteCategory = (categoryId) => {
//     return API_ENDPOINT.post(DELETE_CATEGORY, {
//         categoryId: categoryId,
//     });
// };
//
// export const executeUpdateAuthor = async (authorId,authorName) => {
//     return API_ENDPOINT.post(UPDATE_AUTHOR, {
//         authorId: authorId,
//         authorName:authorName
//     });
// };
//
// export const executeDeleteAuthor = (authorId) => {
//     return API_ENDPOINT.post(DELETE_AUTHOR, {
//         authorId: authorId,
//     });
// };
//
// export const executeGetNewsCategory = ( ) => {
//     return API_ENDPOINT.post(GET_NEWS_CATEGORY, {
//     });
// };
//
// export const executeCreateNewsCategory = async (formData) => {
//     try {
//         const response = await fetch(CREATE_NEWS_CATEGORY, {
//             method: 'POST',
//             body: formData,
//         });
//         return response;
//     } catch (error) {
//         console.error("Error creating book series:", error);
//         throw error;
//     }
// };
//
// export const executeUpdateNewsCategory = async (categoryId,categoryName,imageFile) => {
//     try {
//         const formData = new FormData();
//         formData.append('categoryId', categoryId);
//         formData.append('categoryName', categoryName);
//         if (imageFile) {
//             formData.append('thumbnail', imageFile);
//         }
//
//         const response = await fetch(UPDATE_NEWS_CATEGORY, {
//             method: 'POST',
//             body: formData,
//         });
//         return response;
//     } catch (error) {
//         console.error("Error updating book series:", error);
//         throw error;
//     }
// };
//
// export const executeDeleteNewsCategory = (categoryId) => {
//     return API_ENDPOINT.post(DELETE_NEWS_CATEGORY, {
//         categoryId: categoryId,
//     });
// };
//
// export const executeDeleteContent = (contentId) => {
//     return API_ENDPOINT.post(DELETE_CONTENT, {
//         contentId: contentId
//     });
// };
//
// export const executeRestPassword = (email) => {
//     return API_ENDPOINT.post(REQUEST_RESET_PASSWORD, {
//         email: email
//     });
// };
//
// export const executeGetPictureRim= ( ) => {
//     return API_ENDPOINT.post(GET_PICTURE_RIM, {
//     });
// };
//
// export const executeCreatePictureRim = async (formData) => {
//     try {
//         const response = await fetch(CREATE_PICTURE_RIM, {
//             method: 'POST',
//             body: formData,
//         });
//         return response;
//     } catch (error) {
//         console.error("Error creating book series:", error);
//         throw error;
//     }
// };
//
// export const executeUpdatePictureRim = async (pictureRimID,pictureRimTitle, description,imageFile) => {
//     try {
//         const formData = new FormData();
//         formData.append('pictureRimId', pictureRimID);
//         formData.append('title', pictureRimTitle);
//         formData.append('description', description);
//         if (imageFile) {
//             formData.append('thumbnail', imageFile);
//         }
//
//         const response = await fetch(UPDATE_PICTURE_RIM, {
//             method: 'POST',
//             body: formData,
//         });
//
//         // if (response.ok) {
//         //     const data = await response.json();
//         return response;
//         // } else {
//         //     throw new Error(`Error: ${response.status} ${response.statusText}`);
//         // }
//     } catch (error) {
//         console.error("Error updating book series:", error);
//         throw error;
//     }
// };
//
// export const executeDeletePictureRim = (pictureRimID) => {
//     return API_ENDPOINT.post(DELETE_PICTURE_RIM, {
//         pictureRimId: pictureRimID
//     });
// };
//
// export const executeGetNewsStript= ( ) => {
//     return API_ENDPOINT.post(GET_NEWS_STRIPT, {
//     });
// };
//
// export const executeCreateNewsStript = (newsStriptTitle,description) => {
//     return API_ENDPOINT.post( CREATE_NEWS_STRIPT, {
//         newsScriptTitle:newsStriptTitle,
//         description:description,
//     });
// };
//
// export const executeUpdateNewsStript = async (newsStriptId,newsStriptTitle,description) => {
//     return API_ENDPOINT.post(UPDATE_NEWS_STRIPT, {
//         newsScriptId: newsStriptId,
//         newsScriptTitle:newsStriptTitle,
//         description:description
//     });
// };
//
// export const executeDeleteNewsStript = (newsStriptId ) => {
//     return API_ENDPOINT.post(DELETE_NEWS_STRIPT, {
//         newsScriptId: newsStriptId,
//     });
// };

export const executeGetCategory = () => {
    return API_ENDPOINT.post(GET_CATEGORY, {});
};

export const executeCreateCategory = async (formData) => {
    try {
        const response = await API_ENDPOINT.post(CREATE_CATEGORY, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
};

export const executeGetAuthor = () => {
    return API_ENDPOINT.post(GET_AUTHOR, {});
};

export const executeCreateAuthor = (authorName) => {
    return API_ENDPOINT.post(CREATE_AUTHOR, { authorName });
};

export const executeCreateBookSeries = async (formData) => {
    try {
        const response = await API_ENDPOINT.post(CREATE_BOOK_SERIES, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error("Error creating book series:", error);
        throw error;
    }
};

export const executeUploadContent = async (formData) => {
    try {
        const response = await API_ENDPOINT.post(UPLOAD_CONTENT, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error("Error uploading content:", error);
        throw error;
    }
};

export const executeUpdateContent = async (formData) => {
    try {
        const response = await API_ENDPOINT.post(UPDATE_CONTENT, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error("Error updating content:", error);
        throw error;
    }
};

export const executeGetContent = () => {
    return API_ENDPOINT.post(GET_CONTENT, {});
};

// export const executeUpdateBookSeries = async (formData) => {
//     try {
//         const response = await API_ENDPOINT.post(UPDATE_BOOK_SERIES, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//         return response;
//     } catch (error) {
//         console.error("Error updating book series:", error);
//         throw error;
//     }
// };


export const executeUpdateBookSeries = async (
    seriesId,
    authorName,
    seriesTitle,
    description,
    imageFile,
    seriesPrice,
    audioFile,
    chapterLimit
) => {
    try {
        const formData = new FormData();
        formData.append('seriesId', seriesId);
        formData.append('authorName', authorName);
        formData.append('seriesTitle', seriesTitle);
        formData.append('description', description);
        formData.append('seriesPrice', seriesPrice);
        formData.append('chapterLimit', chapterLimit);

        if (imageFile) {
            formData.append('thumbnail', imageFile); // Append the image file if present
        }

        if (audioFile) {
            formData.append('audioFile', audioFile); // Append the audio file if present
        }

        // Use Axios to send the request
        const response = await API_ENDPOINT.post(UPDATE_BOOK_SERIES, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Axios will handle the boundary automatically
            },
        });

        return response; // Return the Axios response (you can process it later if needed)
    } catch (error) {
        console.error('Error updating book series:', error);
        throw error; // Throw the error to handle it in the calling function
    }
};


export const executeGetBookSeries = () => {
    return API_ENDPOINT.post(GET_BOOK_SERIES, {});
};

export const executeGetSelectedBookSeries = (seriesId) => {
    return API_ENDPOINT.post(GET_SELECTED_BOOK_SERIES, { seriesId });
};

export const executeDeleteBookSeries = (seriesId) => {
    return API_ENDPOINT.post(DELETE_BOOK_SERIES, { seriesId });
};

export const executeCreateNews = async (formData) => {
    try {
        const response = await API_ENDPOINT.post(CREATE_NEWS, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error("Error creating news:", error);
        throw error;
    }
};

export const executeUpdateNews = async (formData) => {
    try {
        const response = await API_ENDPOINT.post(UPDATE_NEWS, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error("Error updating news:", error);
        throw error;
    }
};

export const executeGetNews = () => {
    return API_ENDPOINT.get(GET_NEWS, {});
};

export const executeGetSelectedNews = (newsId) => {
    return API_ENDPOINT.post(GET_SELECTED_NEWS, { newsId });
};

export const executeDeleteNews = (newsId) => {
    return API_ENDPOINT.post(DELETE_NEWS, { newsId });
};

export const executeGetUsers = () => {
    return API_ENDPOINT.get(GET_USERS, {});
};

export const executeSetAdmin = (userId, isAdmin) => {
    return API_ENDPOINT.post(SET_ADMIN, { userId, isAdmin });
};

// export const executeUpdateCategory = async (formData) => {
//     try {
//         const response = await API_ENDPOINT.post(UPDATE_CATEGORY, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//         return response;
//     } catch (error) {
//         console.error("Error updating category:", error);
//         throw error;
//     }
// };


export const executeUpdateCategory = async (categoryId, categoryName, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('categoryId', categoryId);
        formData.append('categoryName', categoryName);
        if (imageFile) {
            formData.append('thumbnail', imageFile);  // Append image file to formData
        }

        const response = await API_ENDPOINT.post(UPDATE_CATEGORY, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
};



export const executeDeleteCategory = (categoryId) => {
    return API_ENDPOINT.post(DELETE_CATEGORY, { categoryId });
};

export const executeUpdateAuthor = async (authorId, authorName) => {
    return API_ENDPOINT.post(UPDATE_AUTHOR, { authorId, authorName });
};

export const executeDeleteAuthor = (authorId) => {
    return API_ENDPOINT.post(DELETE_AUTHOR, { authorId });
};

export const executeGetNewsCategory = () => {
    return API_ENDPOINT.post(GET_NEWS_CATEGORY, {});
};

export const executeCreateNewsCategory = async (formData) => {
    try {
        const response = await API_ENDPOINT.post(CREATE_NEWS_CATEGORY, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error("Error creating news category:", error);
        throw error;
    }
};

export const executeUpdateNewsCategory = async (formData) => {
    try {
        const response = await API_ENDPOINT.post(UPDATE_NEWS_CATEGORY, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error("Error updating news category:", error);
        throw error;
    }
};

export const executeDeleteNewsCategory = (categoryId) => {
    return API_ENDPOINT.post(DELETE_NEWS_CATEGORY, { categoryId });
};

export const executeDeleteContent = (contentId) => {
    return API_ENDPOINT.post(DELETE_CONTENT, { contentId });
};

export const executeRestPassword = (email) => {
    return API_ENDPOINT.post(REQUEST_RESET_PASSWORD, { email });
};

export const executeGetPictureRim = () => {
    return API_ENDPOINT.post(GET_PICTURE_RIM, {});
};

export const executeCreatePictureRim = async (formData) => {
    try {
        const response = await API_ENDPOINT.post(CREATE_PICTURE_RIM, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error("Error creating picture rim:", error);
        throw error;
    }
};

export const executeUpdatePictureRim = async (formData) => {
    try {
        const response = await API_ENDPOINT.post(UPDATE_PICTURE_RIM, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error("Error updating picture rim:", error);
        throw error;
    }
};

export const executeDeletePictureRim = (pictureRimID) => {
    return API_ENDPOINT.post(DELETE_PICTURE_RIM, { pictureRimID });
};

export const executeGetNewsStript = () => {
    return API_ENDPOINT.post(GET_NEWS_STRIPT, {});
};

export const executeCreateNewsStript = (newsStriptTitle, description) => {
    return API_ENDPOINT.post(CREATE_NEWS_STRIPT, {
        newsScriptTitle: newsStriptTitle,
        description,
    });
};

export const executeUpdateNewsStript = (newsStriptId, newsStriptTitle, description) => {
    return API_ENDPOINT.post(UPDATE_NEWS_STRIPT, {
        newsScriptId: newsStriptId,
        newsScriptTitle: newsStriptTitle,
        description,
    });
};

export const executeDeleteNewsStript = (newsStriptId) => {
    return API_ENDPOINT.post(DELETE_NEWS_STRIPT, { newsScriptId: newsStriptId });
};
