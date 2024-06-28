
// export const baseUrl = "http://localhost:3001/api";
export const baseUrl = "https://bookstore-backend-97qw.onrender.com/api";


export const REGISTER_USER = `${baseUrl}/auth/register-admin`;
export const LOGIN_USER = `${baseUrl}/auth/login`;

export const CREATE_CATEGORY = `${baseUrl}/category/create-category`;
export const GET_CATEGORY = `${baseUrl}/category/get-category`;
export const UPDATE_CATEGORY = `${baseUrl}/category/update-category`;
export const DELETE_CATEGORY = `${baseUrl}/category/delete-category`;

export const GET_AUTHOR = `${baseUrl}/author/get-author`;
export const CREATE_AUTHOR = `${baseUrl}/author/create-author`;
export const UPDATE_AUTHOR = `${baseUrl}/author/update-author`;
export const DELETE_AUTHOR= `${baseUrl}/author/delete-author`;

export const CREATE_BOOK_SERIES = `${baseUrl}/series/create-bookSeries`;
export const GET_BOOK_SERIES = `${baseUrl}/series/get-bookSeries`;
export const UPDATE_BOOK_SERIES = `${baseUrl}/series/update-bookSeries`;
export const DELETE_BOOK_SERIES = `${baseUrl}/series/delete-bookSeries`;
export const GET_SELECTED_BOOK_SERIES = `${baseUrl}/series/get-selected-bookSeries`;
export const UPLOAD_CONTENT = `${baseUrl}/content/upload-content`;
export const GET_CONTENT = `${baseUrl}/content/get-content`;

export const GET_USERS = `${baseUrl}/users/get-users`;
export const SET_ADMIN = `${baseUrl}/users/set-admin`;

// news
export const CREATE_NEWS = `${baseUrl}/news/create-news`;
export const GET_NEWS = `${baseUrl}/news/get-news`;
export const UPDATE_NEWS = `${baseUrl}/news/update-news`;
export const DELETE_NEWS = `${baseUrl}/news/delete-news`;
export const GET_SELECTED_NEWS = `${baseUrl}/news/get-selected-news`;
