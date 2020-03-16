import React from "react";
import ReactDOM from "react-dom";
import App from "./app/layout/App";
import "react-toastify/dist/ReactToastify.min.css";
import ScrollToTop from "./app/layout/ScrollToTop";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>,
  document.getElementById("root")
);
