import React from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();



const Toaster = () => {
    const notify = () => {
        toast.success("successful", { autoClose: 3000 });
    };
}

export default Toaster


