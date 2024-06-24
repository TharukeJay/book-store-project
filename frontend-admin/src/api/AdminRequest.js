// import { REGISTER_STUDENT, SIGN_UP } from "./endpoints";
// import API_ENDPOINT from "./httpEndpoint";
//
// export const executeCreateUser = (data) => {
//     return API_ENDPOINT.post(SIGN_UP, data);
// };
//
//
// export const createStudentRequest = (data) => {
//     return API_ENDPOINT.post(REGISTER_STUDENT, data)
//         .then((response) => {
//             // Handle successful response (status code 200)
//             return response.data; // Access the response data
//         })
//         .catch((error) => {
//             if (error.response && error.response.status === 400) {
//                 // Handle 400 Bad Request response
//                 console.error("Bad Request:", error.response.data);
//                 // You can access the error response data using error.response.data
//                 return Promise.reject(error.response.data); // Reject the promise with the error response data
//             } else {
//                 // Handle other errors (e.g., network issues)
//                 console.error("Error:", error);
//                 return Promise.reject("An error occurred"); // Reject the promise with a generic error message
//             }
//         });
// };
