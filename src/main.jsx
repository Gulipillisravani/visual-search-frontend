import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import BuyNow from "./BuyNow";

import Cart from "./Cart";
import Wishlist from "./Wishlist";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/buy" element={<BuyNow />} />
      <Route
  path="/cart"
  element={<Cart />}
/>

<Route
  path="/wishlist"
  element={<Wishlist />}
/>
    </Routes>
  </BrowserRouter>
);