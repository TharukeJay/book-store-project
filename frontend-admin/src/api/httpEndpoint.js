import axios from "axios";
import { baseUrl} from "../configs/commomConfigs";


const API_ENDPOINT = axios.create({
    baseURL: baseUrl,
});


export default API_ENDPOINT;