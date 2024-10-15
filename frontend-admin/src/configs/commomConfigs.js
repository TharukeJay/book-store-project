
export const baseUrl = "http://localhost:3001/api";
// export const baseUrl = "https://bookstore-backend-97qw.onrender.com/api";
 
const token = window.location.href.split('/reset-password/')[1];

export const REGISTER_USER = `${baseUrl}/auth/register-admin`;
export const LOGIN_USER = `${baseUrl}/auth/login`;

export const CREATE_CATEGORY = `${baseUrl}/category/create-category`;
export const GET_CATEGORY = `${baseUrl}/category/get-category`;
export const UPDATE_CATEGORY = `${baseUrl}/category/update-category`;
export const DELETE_CATEGORY = `${baseUrl}/category/delete-category`;

export const CREATE_NEWS_CATEGORY = `${baseUrl}/newsCategory/create-news-category`;
export const GET_NEWS_CATEGORY = `${baseUrl}/newsCategory/get-news-category`;
export const UPDATE_NEWS_CATEGORY = `${baseUrl}/newsCategory/update-news-category`;
export const DELETE_NEWS_CATEGORY = `${baseUrl}/newsCategory/delete-news-category`;

export const CREATE_NEWS_STRIPT = `${baseUrl}/newsScript/create-newsScript`;
export const GET_NEWS_STRIPT  = `${baseUrl}/newsScript/get-newsScript`;
export const UPDATE_NEWS_STRIPT = `${baseUrl}/newsScript/update-newsScript`;
export const DELETE_NEWS_STRIPT = `${baseUrl}/newsScript/delete-newsScript`;

export const CREATE_PICTURE_RIM = `${baseUrl}/pictureRim/create-pictureRim`;
export const GET_PICTURE_RIM = `${baseUrl}/pictureRim/get-pictureRim`;
export const UPDATE_PICTURE_RIM = `${baseUrl}/pictureRim/update-pictureRim`;
export const DELETE_PICTURE_RIM = `${baseUrl}/pictureRim/delete-pictureRim`;

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
export const UPDATE_CONTENT = `${baseUrl}/content/update-content`;
export const DELETE_CONTENT = `${baseUrl}/content/delete-content`;
export const GET_CONTENT = `${baseUrl}/content/get-content`;

export const GET_USERS = `${baseUrl}/users/get-users`;
export const SET_ADMIN = `${baseUrl}/users/set-admin`;

// news
export const CREATE_NEWS = `${baseUrl}/news/create-news`;
export const GET_NEWS = `${baseUrl}/news/get-news`;
export const UPDATE_NEWS = `${baseUrl}/news/update-news`;
export const DELETE_NEWS = `${baseUrl}/news/delete-news`;
export const GET_SELECTED_NEWS = `${baseUrl}/news/get-selected-news`;
export const REQUEST_RESET_PASSWORD = `${baseUrl}/auth/request-reset-password-link-email`;
export const CONFIRM_RESET_PASSWORD = `${baseUrl}/auth/confirm-reset-password`;
