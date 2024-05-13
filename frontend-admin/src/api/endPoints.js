import {
    CREATE_AUTHOR,
    CREATE_CATEGORY, GET_AUTHOR,
    GET_CATEGORY,
    LOGIN_USER,
} from "../configs/commomConfigs";
import API_ENDPOINT from "./httpEndpoint";


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
        authorName:authorName
    });
};
