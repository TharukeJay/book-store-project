import {
    LOGIN_USER,
} from "../configs/commomConfigs";
import API_ENDPOINT from "./httpEndpoint";


export const executeLoginUser = ( email, password) => {
    return API_ENDPOINT.post(LOGIN_USER, {
        email: email,
        password: password,
    });
};

