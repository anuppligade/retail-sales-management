import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
      <div className="text-center mt-5 mb-3 text-muted small">
  © {new Date().getFullYear()} Retail Sales Management — All Rights Reserved. 
  Developed by Deekshitha
</div>
  </BrowserRouter>
);
