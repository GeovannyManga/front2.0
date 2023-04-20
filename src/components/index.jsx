import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./styles/index.css";
import "../styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import axios from "axios";

// axios.defaults.baseURL =
// "https://backend-del-hotel-production-c60b.up.railway.app/";
axios.defaults.baseURL = "https://back20-production.up.railway.app/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
