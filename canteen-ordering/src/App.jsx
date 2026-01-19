
import React from "react";
import Home from "./screen/Home";
import RestaurantDetails from "./screen/RestaurantDetails";
import Cart from "./screen/Cart";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>

      {/* Educational & Legal Disclaimer Footer */}
      <footer className="bg-slate-900 text-white py-4 px-4 border-t border-blue-400/30">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">📚</span>
              <span className="font-medium">For Learning Purposes Only</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">🖼️</span>
              <span>Images from Unsplash (Free License)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">🎯</span>
              <span>All Content is 100% Fictional</span>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-400">
            Built with React & Redux Toolkit • Educational Project Only • Not for Commercial Use
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
