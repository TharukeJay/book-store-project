import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Authentication/Login";
import SignUp from "../pages/Authentication/SignUp";


const authProtectedRoutes = [
    { path: "/home", component: <Home />, roles: ["user", "admin"] },
    // { path: "/logout", component: <Logout />, roles: ["user", "admin"] },
    // Other protected routes...
];

const publicRoutes = [
    { path: "/login", component: <Login /> },
    { path: "/register", component: <SignUp /> },
    {
        path: "/",
        exact: true,
        component: <Navigate to="/login" />,
    },
];

export { authProtectedRoutes, publicRoutes };
