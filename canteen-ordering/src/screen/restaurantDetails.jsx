import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useGetResaturantData } from "../Hooks";
import { dummyImage } from "../components/restaurantCard";
import { addItemsInCart } from "../Store/app";

// Toast Component positioned under cart
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center space-x-3 border-2 border-green-400 animate-slide-up">
      <span className="text-xl">✅</span>
      <span className="font-medium">{message}</span>
    </div>
  );
};

const RestaurantDetails = () => {
  const dispatch = useDispatch();
  useGetResaturantData();
  const { id } = useParams();

  const allRestaurantData = useSelector((state) => state.app.restaurantData);
  const cartData = useSelector((state) => state.app.cartData);

  const restaurantData = allRestaurantData.find((data) => data.id === id);

  // Calculate total cart items
  const totalCartItems =
    cartData?.reduce((total, restaurant) => {
      return (
        total +
        restaurant.menuItems.reduce((sum, item) => sum + item.quantity, 0)
      );
    }, 0) || 0;

  const [imageUri, setImageUri] = useState(() => {
    return (
      restaurantData?.image_url ||
      dummyImage[0] ||
      "https://picsum.photos/800/600?random=fallback"
    );
  });

  // Toast state
  const [toast, setToast] = useState(null);

  function handleImageError() {
    const idx = Math.floor(Math.random() * dummyImage.length);
    setImageUri(dummyImage[idx]);
  }

  function handleMenuImageError(itemId) {
    const idx = Math.floor(Math.random() * dummyImage.length);
    // For menu items, we could update the item image, but for now let's just use a fallback
    return dummyImage[idx];
  }

  function handleClick(itemId) {
    dispatch(addItemsInCart({ resId: id, item_id: itemId }));
    // Show success toast
    setToast(`Item added to cart! (${totalCartItems + 1} items)`);
  }

  const closeToast = () => setToast(null);

  if (!restaurantData)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-xl">
        Loading...
      </div>
    );

  const { name, rating, cuisine, address, menu } = restaurantData;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="w-full bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-2xl sticky top-0 z-50 border-b-2 border-blue-400/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold text-white tracking-wide drop-shadow-lg">
              🍽️ Canteen
            </h1>
          </Link>

          <Link to="/cart" className="relative">
            <button className="bg-transparent hover:bg-white/10 backdrop-blur-md text-white p-3 rounded-xl text-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20 hover:border-white/40 relative z-10">
              🛒
            </button>
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg border-2 border-white animate-pulse z-20">
                {totalCartItems > 99 ? "99+" : totalCartItems}
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

      {/* Restaurant Header */}
      <div className="max-w-6xl mx-auto mt-6 bg-white rounded-xl shadow-md overflow-hidden">
        <img
          onError={handleImageError}
          src={imageUri}
          alt={name}
          className="w-full h-[350px] object-cover"
        />

        <div className="p-6 flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-gray-800">{name}</h2>

          <div className="flex gap-3 items-center text-sm">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full">
              ⭐ {rating}
            </span>
            <span className="bg-gray-200 px-3 py-1 rounded-full text-gray-700">
              {cuisine}
            </span>
          </div>

          <p className="text-gray-600 mt-1">{address}</p>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-6xl mx-auto mt-8 px-2 sm:px-0">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Menu Items</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menu?.map((item) => (
            <div
              key={item.item_id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col gap-4 p-4">
                {/* Food Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    const idx = Math.floor(Math.random() * dummyImage.length);
                    e.target.src = dummyImage[idx];
                  }}
                  className="w-full h-32 object-cover rounded-lg"
                />

                {/* Content */}
                <div className="flex flex-col gap-3">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="font-bold text-gray-900 mt-1">
                      ₹ {item.price}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      handleClick(item.item_id);
                    }}
                    className="self-start mt-2 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 text-white text-sm px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold border border-blue-400"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State If No Menu */}
        {menu?.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No food items available.
          </p>
        )}
      </div>

      {/* Toast Notification */}
      {toast && <Toast message={toast} onClose={closeToast}></Toast>}
    </div>
  );
};

export default RestaurantDetails;
