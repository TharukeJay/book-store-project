import axios from "axios";

const DOMAIN = 'https://localhost:3001/api';
const domain = DOMAIN + '/auth';  

const loginAPI = domain + '/login';
const registerAPI = domain + '/register';
const resetPasswordAPI = domain + '/reset-password';
const recoverPasswordAPI = domain + '/recover-password';

const authApi = {
    registerAPI,
    loginAPI,
    resetPasswordAPI,
    recoverPasswordAPI
};

export default authApi;
