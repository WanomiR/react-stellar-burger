import React from "react";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById("root"))
const ingredientsDataUrl = "https://norma.nomoreparties.space/api/ingredients";

root.render(
  <React.StrictMode>
    <App dataUrl={ingredientsDataUrl}/>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
