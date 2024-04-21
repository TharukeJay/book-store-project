import {
    REGISTER_USER
} from "../configs/commomConfigs";
import API_ENDPOINT from "./httpEndpoint";


export const executeRegisterUser = (username,email, password) => {
    return API_ENDPOINT.post(REGISTER_USER, {
        username :username,
        email: email,
        password: password,
    });
};

