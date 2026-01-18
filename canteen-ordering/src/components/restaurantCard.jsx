import React, { useState } from "react";
import { Link } from "react-router-dom";

// Completely free images for educational/learning purposes only
export const dummyImage = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800", // 🍕 Margherita Pizza
  "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800", // 🍛 Chicken Tikka Masala
  "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800", // 🍝 Creamy Fettuccine
  "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800", // 🍱 California Roll
  "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800", // 🌮 Beef Tacos
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", // 🥗 Mediterranean Bowl
  "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800", // 🥗 Fresh Garden Salad
  "https://images.unsplash.com/photo-1603894584373-5ac82b2ae391?w=800", // 🍗 Butter Chicken
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800", // 🍔 Classic Cheeseburger
  "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800", // 🍨 Strawberry Milkshake
];

const RestaurantCard = ({ data }) => {
  const { id, name, rating, cuisine, address, image_url } = data || {};
  const [image, setImage] = useState(image_url);

  function handleError() {
    const idx = Math.floor(Math.random() * dummyImage.length);
    setImage(dummyImage[idx]);
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200">
      {/* Restaurant Image */}
      <div className="relative h-48 w-full">
        <img
          onError={handleError}
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 bg-black bg-opacity-70 text-white text-xs px-3 py-1 rounded-full">
          {cuisine}
        </span>
        <span className="absolute bottom-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
          ⭐ {rating}
        </span>
      </div>

      {/* Details */}
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>
        <p className="text-sm text-gray-600 leading-tight line-clamp-2">
          {address}
        </p>
        <Link to={`/restaurant/${id}`}>
          <button className="w-full mt-3 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 text-white text-sm font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-blue-400">
            View Menu
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
