import axios from "axios";
import { baseUrl} from "../configs/commomConfigs";


const API_ENDPOINT = axios.create({
    baseURL: baseUrl,
});

// Add an interceptor to modify requests
API_ENDPOINT.interceptors.request.use(async (config) => {
    // const token = localStorage.getItem("token");

    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const token = authUser && authUser.token;
    if (token) {
        // Include the JWT token in the Authorization header
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
});




export default API_ENDPOINT;