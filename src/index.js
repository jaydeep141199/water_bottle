import { createRoot } from "react-dom/client";
import "../src/assets/css/index.css";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);

// import React from "react";
// import  ReactDOM  from "react-dom";
// import App from "./App";
// import '../src/assets/css/index.css';

// ReactDOM.render(<App/>,document.getElementById("root"))
