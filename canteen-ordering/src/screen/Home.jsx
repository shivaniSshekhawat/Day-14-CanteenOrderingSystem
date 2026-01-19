import React from "react";
import { useGetResaturantData } from "../Hooks";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RestaurantCard from "../components/restaurantCard";

const Home = () => {
  useGetResaturantData();
  const restaurantData = useSelector((state) => state.app.restaurantData);
  const cartData = useSelector((state) => state.app.cartData);

  // Calculate total cart items
  const totalCartItems = cartData?.reduce((total, restaurant) => {
    return total + restaurant.menuItems.reduce((sum, item) => sum + item.quantity, 0);
  }, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="w-full bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-2xl sticky top-0 z-50 border-b-2 border-blue-400/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white tracking-wide drop-shadow-lg">
            🍽️ Canteen
          </h1>

          <Link to="/cart" className="relative">
            <button className="bg-transparent hover:bg-white/10 backdrop-blur-md text-white p-3 rounded-xl text-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20 hover:border-white/40 relative z-10">
              🛒
            </button>
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg border-2 border-white animate-pulse z-20">
                {totalCartItems > 99 ? '99+' : totalCartItems}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Educational Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
        <div className="max-w-6xl mx-auto px-5 py-3">
          <div className="flex items-center justify-center gap-4 text-sm text-blue-700">
            <span className="flex items-center gap-1">
              <span className="text-lg">📚</span>
              <span className="font-medium">Learning Project</span>
            </span>
            <span className="text-blue-400">•</span>
            <span className="flex items-center gap-1">
              <span className="text-lg">🖼️</span>
              <span>Images: Unsplash Free License</span>
            </span>
            <span className="text-blue-400">•</span>
            <span className="flex items-center gap-1">
              <span className="text-lg">🎯</span>
              <span>100% Fictional Content</span>
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-5 py-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Popular Restaurants
        </h2>

        {restaurantData?.length === 0 ? (
          <div className="w-full text-center py-16 text-gray-500 text-lg">
            Loading Restaurants...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {restaurantData.map((obj) => (
              <RestaurantCard key={obj.id} data={obj} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
