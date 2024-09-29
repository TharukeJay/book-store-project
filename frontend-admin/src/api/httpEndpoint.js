import axios from "axios";
import { baseUrl} from "../configs/commomConfigs";


const API_ENDPOINT = axios.create({
    baseURL: baseUrl,
});

// Add an interceptor to modify requests
API_ENDPOINT.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error, 'session expire');
    }
);




export default API_ENDPOINT;