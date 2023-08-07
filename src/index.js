import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { MantineProvider } from "@mantine/core";
// import { Notifications } from "@mantine/notifications";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <MantineProvider withGlobalStyles withNormalizeCSS>
  //     <App />
  //     <Notifications position="top-right" limit={3} />
  //   </MantineProvider>
  // </React.StrictMode>
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
