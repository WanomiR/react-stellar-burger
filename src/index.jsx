import React from "react";
import reportWebVitals from "./reportWebVitals";
import {createRoot} from 'react-dom/client'
import {Provider} from "react-redux";

import "./index.css";
import App from "./components/app/app";
import store from "./services/store"

const root = createRoot(document.getElementById("root"))


root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
