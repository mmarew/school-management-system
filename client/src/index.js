import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ContextWrapper from "./Components/Redux/ContextWrapper";
import { BrowserRouter as Router } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <ContextWrapper>
      <App />
    </ContextWrapper>
  </Router>
);
