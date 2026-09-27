import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import "./index.css";

import { BuyerAuthProvider } from "./context/BuyerAuthContext";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BuyerAuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </BuyerAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);