import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        {/*<BrowserRouter>*/}
            <App />
        {/*</BrowserRouter>*/}
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
//
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import "./i18n";
//
// import { configureStore } from "./store/store";
//
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//     <React.Fragment>
//         <BrowserRouter>
//             <Provider store={configureStore({})}>
//                 <App />
//             </Provider>
//         </BrowserRouter>
//     </React.Fragment>
// );
// reportWebVitals();
// // serviceWorker.unregister();

// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
//
// ReactDOM.render(<App />, document.getElementById("root"));
