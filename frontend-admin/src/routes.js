import React from "react";
import Home from "./pages/Home";

const Login = React.lazy(() => import("./pages/Login"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const Home = React.lazy(() => import("./pages/Home"));


const routes = [
    { path: "/login", name: "Login", element: Login, exact: true },
    { path: "/signup", name: "SignUp", element: SignUp, exact: true },
    { path: "/home", name: "Home", element: Home, exact: true },

];
export default routes;