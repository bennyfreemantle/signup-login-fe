import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { TodoContextProvider } from "./context/TodoContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <TodoContextProvider>
      <App />
    </TodoContextProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);
