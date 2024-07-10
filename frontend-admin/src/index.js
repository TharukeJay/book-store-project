// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import {BrowserRouter} from "react-router-dom";
//
// ReactDOM.render(
//     <React.StrictMode>
//         {/*<BrowserRouter>*/}
//             <App />
//         {/*</BrowserRouter>*/}
//     </React.StrictMode>,
//     document.getElementById('root')
// );
//
// /

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // Make sure the path to App is correct

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);
