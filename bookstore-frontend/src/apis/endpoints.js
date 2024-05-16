// import API_ENDPOINT from "../apis/httpAxios";

export const baseUrl = "http://localhost:3001/api/";

// Auth
export const SIGN_UP = `${baseUrl}auth/register`;
export const LOG_IN = `${baseUrl}auth/login`;
export const VERIFY_TOKEN = `${baseUrl}auth/verify-token`;
export const REQUEST_RESET_PASSWORD_EMAIL = `${baseUrl}auth/request-reset-password-link-email`;
export const CONFIRM_RESET_PASSWORD = `${baseUrl}auth/confirm-reset-password`;

// Book
export const FETCH_ALL_BOOK = `${baseUrl}books/get-data`;
export const FETCH_ALL_READ_BOOK = `${baseUrl}books/read-book`;
export const FETCH_ALL_READ_BOOK_PDF = `${baseUrl}books/read-book-pdf`;

// NEWS
export const FETCH_ALL_NEWS = `${baseUrl}books/get-news`;
export const FETCH_ALL_READ_NEWS = `${baseUrl}books/read-news`;
