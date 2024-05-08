import axios from "axios";

const DOMAIN = 'https://localhost:3001/api';
const domain = DOMAIN + '/auth';         //login

const loginAPI = domain + '/login';
const registerAPI = domain + '/signup';
const resetPasswordAPI = domain + '/reset-password';
const recoverPasswordAPI = domain + '/recover-password';

const signup = (data) => axios.post(registerAPI, data);
const login = (data) => axios.post(loginAPI, data);
const resetpassword = (data) => axios.post(resetPasswordAPI, data);
const recoverpassword = (data) => axios.post(recoverPasswordAPI, data);

const authApi = {
    login,
    signup,
    resetpassword,
    recoverpassword,
};

export default authApi;
