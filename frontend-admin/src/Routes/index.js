// import React from "react";
// import { Routes, Route } from "react-router-dom";
//
// // redux
// import { useSelector } from "react-redux";
//
// //constants
// import { layoutTypes } from "../constants/layout";
//
// // layouts
// import NonAuthLayout from "../Layout/NonAuthLayout";
// import VerticalLayout from "../Layout/VerticalLayout/index";
// import HorizontalLayout from "../Layout/HorizontalLayout/index";
// import { AuthProtected } from "./AuthProtected";
//
// import { authProtectedRoutes, publicRoutes } from "./routes";
// import { getLoggedinUser } from "../helpers/api_helper";
//
// const getLayout = (layoutType) => {
//     let Layout = VerticalLayout;
//     switch (layoutType) {
//         case layoutTypes.VERTICAL:
//             Layout = VerticalLayout;
//             break;
//         case layoutTypes.HORIZONTAL:
//             Layout = HorizontalLayout;
//             break;
//         default:
//             break;
//     }
//     return Layout;
// };
//
// const Index = () => {
//     const { layoutType } = useSelector((state) => ({
//         layoutType: state.Layout.layoutType,
//     }));
//
//     const Layout = getLayout(layoutType);
//
//     // Function to filter routes based on user roles
//     // const userRoles = ["admin", "moderator", "superadmin", "student"];
//
//     const currentLoggedInUser = getLoggedinUser();
//
//     const filterRoutes = (routes, currentLoggedInUser) => {
//         return routes.filter((route) => {
//             // Check if the user has permission for this route
//             if (route.roles) {
//                 try {
//                     return route.roles.includes(currentLoggedInUser.role);
//                 } catch (error) {
//                     return false;
//                 }
//             } else {
//                 return true;
//             }
//         });
//     };
//
//     // const filteredPublicRoutes = filterRoutes(publicRoutes, currentLoggedInUser);
//     const filteredAuthProtectedRoutes = filterRoutes(
//         authProtectedRoutes,
//         currentLoggedInUser
//     );
//
//     return (
//         <Routes>
//             <Route>
//                 {/* {publicRoutes.map((route, idx) => ( */}
//                 {publicRoutes.map((route, idx) => (
//                     <Route
//                         path={route.path}
//                         element={<NonAuthLayout>{route.component}</NonAuthLayout>}
//                         key={idx}
//                         exact={true}
//                     />
//                 ))}
//             </Route>
//
//             <Route>
//                 {/* {authProtectedRoutes.map((route, idx) => ( */}
//                 {filteredAuthProtectedRoutes.map((route, idx) => (
//                     <Route
//                         path={route.path}
//                         element={
//                             <AuthProtected>
//                                 <Layout>{route.component}</Layout>
//                             </AuthProtected>
//                         }
//                         key={idx}
//                         exact={true}
//                     />
//                 ))}
//             </Route>
//         </Routes>
//     );
// };
//
// export default Index;
