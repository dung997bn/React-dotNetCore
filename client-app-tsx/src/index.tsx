import React from "react";
import ReactDOM from "react-dom";
import App from "./app/layout/App";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./app/layout/ScrollToTop";

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </BrowserRouter>,
  document.getElementById("root")
);
