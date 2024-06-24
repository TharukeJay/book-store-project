import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            // Check authentication logic here (e.g., check if user is logged in and has the required role)
            const isAuthenticated = true; // Replace this with your actual authentication logic
            const userRole = "admin"; // Replace this with the user's role fetched from authentication

            if (!isAuthenticated) {
                // Redirect to login if not authenticated
                return <Navigate to="/login" />;
            }

            // Check if the user has the required role to access the route
            // if (roles && !roles.includes(userRole)) {
            //     // Redirect to unauthorized page or handle as needed
            //     return <Navigate to="/unauthorized" />;
            // }

            // Render the protected component if authenticated and authorized
            return <Component {...props} />;
        }}
    />
);

export default PrivateRoute;
