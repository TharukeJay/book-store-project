// import API_ENDPOINT from "../apis/httpAxios";

export const baseUrl = "https://bookstore-backend-97qw.onrender.com/api/";
// export const baseUrl = "http://localhost:3001/api/";

// Auth
export const SIGN_UP = `${baseUrl}auth/register`;
export const LOG_IN = `${baseUrl}auth/login`;
export const VERIFY_TOKEN = `${baseUrl}auth/verify-token`;
export const REQUEST_RESET_PASSWORD_EMAIL = `${baseUrl}auth/request-reset-password-link-email`;
export const CONFIRM_RESET_PASSWORD = `${baseUrl}auth/confirm-reset-password`;
export const GET_USER_DATA = `${baseUrl}auth/getUserData`;

// Book
export const FETCH_ALL_BOOK = `${baseUrl}books/get-data`;
export const FETCH_ALL_READ_BOOK = `${baseUrl}books/read-book`;
export const FETCH_ALL_READ_BOOK_PDF = `${baseUrl}books/read-book-pdf`;
export const FETCH__READ_MY_BOOK_PDF = `${baseUrl}books/read-my-book-pdf`;

//comments
export const SET_COMMENTS = `${baseUrl}books/set-comments`;
export const SET_COMMENTS_AUDIO = `${baseUrl}books/save-comments`;
export const GET_COMMENTS = `${baseUrl}books/get-comments`;
export const GET_COMMENTS_AUDIO = `${baseUrl}books/get-audio-comments`;

//Audio Book
export const FETCH_ALL_AUDIO_BOOK = `${baseUrl}books/get-data-series`;
export const FETCH_ALL_AUDIO_BOOK_ID = `${baseUrl}books/get-data-series-id`;
export const FETCH_ALL_BOOK_SERIES_ID = `${baseUrl}books/get-audio-book`;
export const FETCH_LISTNING_AUDIO = `${baseUrl}books/audio-progress`;
export const SET_LISTNING_AUDIO = `${baseUrl}books/audio-progress`;

//Category
export const FETCH_ALL_CATEGORY= `${baseUrl}books/get-category`;
export const FETCH_NEWS_CATEGORY= `${baseUrl}books/get-news-category`;

// Privacy
export const FETCH_PRIVACY= `${baseUrl}privacy/get-privacy`;
// export const FETCH_PRIVACY= `${baseUrl}books/get-privacy-pdf`;

// Checkout
export const ADD_TO_PURCHASE_BOOK= `${baseUrl}books/purchase-book`;

// NEWS
export const FETCH_ALL_NEWS = `${baseUrl}books/get-news`;
export const FETCH_ALL_READ_NEWS = `${baseUrl}books/read-news`;

//news scipt

export const FETCH_ALL_NEWS_PICTURE_RIM = `${baseUrl}books/get-News-PictureRim`;
export const FETCH_ALL_READ_NEWS_PICTURE_RIM_ID = `${baseUrl}books/read-news-PictureRim`;


//news scipt
export const FETCH_ALL_NEWS_SCRIPTS = `${baseUrl}books/get-news-script`;

// Payment
export const CREATE_PAYMENT = `${baseUrl}payment/payment-create`;
export const PAYMENT_NOTIFY = `${baseUrl}payment/payment-notify`;
export const PAYMENT_SUCCESS = `${baseUrl}payment/payment-success`;