import React from "react";
import Home from "./screen/Home";
import RestaurantDetails from "./screen/RestaurantDetails";
import Cart from "./screen/Cart";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurant/:id" element={<RestaurantDetails />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default App;
