import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App></App>
    </QueryClientProvider>
  </React.StrictMode>
);

// // Disable right-click
// document.addEventListener("contextmenu", (e) => e.preventDefault());

// function ctrlShiftKey(e, keyCode) {
//   return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
// }

// document.onkeydown = (e) => {
//   // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
//   if (
//     event.keyCode === 123 ||
//     ctrlShiftKey(e, "I") ||
//     ctrlShiftKey(e, "J") ||
//     ctrlShiftKey(e, "C") ||
//     (e.ctrlKey && e.keyCode === "U".charCodeAt(0))
//   )
//     return false;
// };
