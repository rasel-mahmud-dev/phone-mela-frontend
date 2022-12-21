import React from "react";
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from "./App";
import store from "../src/store"
import {Provider} from "react-redux";

// import "./asserts/fontawesome-pro-5.12.0-web/css/all.css"
import "./index.css";

const container = document.getElementById('root');

// createRoot(container!) if you use TypeScript
const root = createRoot(container!);


root.render(
    <>
        <Provider store={store}>
            <BrowserRouter>
                <ToastContainer pauseOnHover={true} autoClose={1000}/>
                <App/>
            </BrowserRouter>
        </Provider>
    </>
);


