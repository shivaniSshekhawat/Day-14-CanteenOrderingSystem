import React, { useState } from "react";
import { Link } from "react-router-dom";

// 🎯 ALL IMAGES FROM UNSPLASH.COM - FREE FOR PERSONAL & COMMERCIAL USE (https://unsplash.com/license)
// 📚 PURE VEGETARIAN FOOD IMAGES ONLY - Fictional content for React/Redux learning
export const dummyImage = [
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", // 🥗 Buddha Bowl - pure veg
  "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800", // 🥗 Green Garden Salad - pure veg
  "https://images.unsplash.com/photo-1603894584373-5ac82b2ae391?w=800", // 🍛 Paneer Butter Masala - pure veg
  "https://images.unsplash.com/photo-1639024471283-03518883512d?w=800", // 🥟 Idli Sambar - pure veg
  "https://images.unsplash.com/photo-1563379091339-03246963d4ad?w=800", // 🍚 Vegetable Biryani - pure veg
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800", // 🫘 Chana Masala - pure veg
  "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800", // 🥑 Avocado Toast - pure veg
  "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800", // 🧀 Caprese Salad - pure veg
  "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800", // 🍓 Fresh Fruit Bowl - pure veg
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800", // 🥟 Vada Pav - pure veg
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800", // 🍕 Vegetarian Pizza - pure veg
  "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800", // 🍔 Veggie Burger - pure veg
  "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800", // 🥙 Falafel Wrap - pure veg
  "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800", // 🥗 Mixed Salad - pure veg
  "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=800"  // 🥤 Smoothie Bowl - pure veg
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
