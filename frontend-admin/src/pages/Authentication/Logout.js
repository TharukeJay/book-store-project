// import React, { useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import withRouter from "../../components/Common/withRouter";
// import { logoutUser } from "../../store/actions";
// import { useSelector, useDispatch } from "react-redux";
//
// const Logout = () => {
//     const dispatch = useDispatch();
//
//     const { isUserLogout } = useSelector((state) => ({
//         isUserLogout: state.login.isUserLogout,
//     }));
//
//     useEffect(() => {
//         dispatch(logoutUser());
//     }, [dispatch]);
//
//     if (isUserLogout) {
//         return <Navigate to="/login" />;
//     }
//
//     return <></>;
// };
//
// export default withRouter(Logout);
