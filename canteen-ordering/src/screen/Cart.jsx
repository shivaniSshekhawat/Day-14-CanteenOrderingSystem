import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItemsInCart, deleteItemsInCart } from "../Store/app";
import { dummyImage } from "../components/restaurantCard";

const Cart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.app.cartData);

  // Calculate total cart items
  const totalCartItems =
    cartData?.reduce((total, restaurant) => {
      return (
        total +
        restaurant.menuItems.reduce((sum, item) => sum + item.quantity, 0)
      );
    }, 0) || 0;

  const totalAmount = cartData?.reduce((acc, rest) => {
    const resTotal = rest.menuItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    return acc + resTotal;
  }, 0);

  function handleAddItem(resId, itemId) {
    dispatch(addItemsInCart({ resId: resId, item_id: itemId }));
  }

  function handleDeleteItem(resId, itemId) {
    console.log("handleDeleteItem");
    dispatch(deleteItemsInCart({ resId: resId, item_id: itemId }));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="w-full bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-2xl sticky top-0 z-50 border-b-2 border-blue-400/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold text-white tracking-wide drop-shadow-lg">
              🍽️ Canteen
            </h1>
          </Link>

          <div className="flex items-center space-x-2 relative">
            <span className="text-white font-medium">Cart</span>
            <div className="relative">
              <span className="text-2xl relative z-10 text-white bg-transparent">
                🛒
              </span>
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg border-2 border-slate-900 animate-pulse z-20">
                  {totalCartItems > 99 ? "99+" : totalCartItems}
                </span>
              )}
            </div>
          </div>
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

      {/* Cart Content */}
      {!cartData || cartData.length === 0 ? (
        /* Full Width Empty Cart */
        <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 text-6xl">🍕</div>
            <div className="absolute top-20 right-20 text-4xl">🍔</div>
            <div className="absolute bottom-20 left-20 text-5xl">🍝</div>
            <div className="absolute bottom-10 right-10 text-3xl">🥗</div>
            <div className="absolute top-1/2 left-1/4 text-5xl">🌮</div>
            <div className="absolute top-1/3 right-1/4 text-4xl">🍜</div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-4 py-12">
            <div className="max-w-6xl mx-auto text-center">
              {/* Animated White Cart Icon */}
              <div className="mb-8">
                <div className="text-8xl mb-6 filter drop-shadow-2xl text-white animate-bounce">
                  🛒
                </div>
                <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto"></div>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
                Your Cart is Empty
              </h2>

              <p className="text-xl md:text-2xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
                Discover delicious food from amazing restaurants and fill your
                cart with great meals!
              </p>

              {/* Feature Highlights - Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300">
                  <div className="text-4xl mb-4">🚚</div>
                  <h3 className="font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-2 text-lg">
                    Fast Delivery
                  </h3>
                  <p className="text-gray-600">
                    Get your food delivered in under 20 minutes
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300">
                  <div className="text-4xl mb-4">⭐</div>
                  <h3 className="font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-2 text-lg">
                    Top Rated
                  </h3>
                  <p className="text-gray-600">
                    Only the best restaurants in your area
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300 sm:col-span-2 lg:col-span-1">
                  <div className="text-4xl mb-4">💰</div>
                  <h3 className="font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-2 text-lg">
                    Great Prices
                  </h3>
                  <p className="text-gray-600">
                    Affordable food without compromising quality
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                to="/"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 px-8 py-4 rounded-2xl font-bold text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl border-2 border-blue-400 text-white"
              >
                <span className="text-2xl">🍽️</span>
                <span className="text-white">
                  Explore Amazing Restaurants
                </span>
                <span className="text-xl">→</span>
              </Link>

              {/* Professional Footer Text */}
              <p className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent text-base mt-8 font-medium">
                Start your food journey today! 🍽️
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Filled Cart Layout */
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT SECTION - Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartData.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-white shadow-md rounded-xl overflow-hidden border"
                >
                  {/* Restaurant Header */}
                  <div className="flex gap-3 p-4 border-b">
                    <img
                      src={restaurant.restaurantDetails.image_url}
                      className="w-full h-24 object-cover rounded-lg"
                      alt=""
                      onError={(e) => {
                        const idx = Math.floor(
                          Math.random() * dummyImage.length,
                        );
                        e.target.src = dummyImage[idx];
                      }}
                    />
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">
                        {restaurant.restaurantDetails.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {restaurant.restaurantDetails.cuisine}
                      </p>
                      <p className="text-xs text-gray-400">
                        {restaurant.restaurantDetails.address}
                      </p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-4 space-y-4">
                    {restaurant.menuItems.map((item) => (
                      <div
                        key={item.item_id}
                        className="flex justify-between items-center border p-3 rounded-xl"
                      >
                        <div className="flex gap-3">
                          <img
                            src={item.image}
                            className="w-full h-20 rounded-lg object-cover"
                            alt=""
                            onError={(e) => {
                              const idx = Math.floor(
                                Math.random() * dummyImage.length,
                              );
                              e.target.src = dummyImage[idx];
                            }}
                          />
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-1">
                              {item.description}
                            </p>
                            <p className="font-semibold mt-1">
                              ₹{item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border rounded-lg overflow-hidden">
                            <button
                              onClick={() =>
                                handleDeleteItem(restaurant.id, item.item_id)
                              }
                              className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100"
                            >
                              −
                            </button>
                            <span className="px-4 font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleAddItem(restaurant.id, item.item_id)
                              }
                              className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>

                          <p className="font-bold text-gray-800">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT SECTION - Order Summary */}
            <div className="bg-white shadow-xl rounded-2xl p-6 h-fit sticky top-20 border border-blue-100">
              <h2 className="text-xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
                Order Summary
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>

                <hr className="my-2" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <button className="mt-5 w-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border-2 border-blue-400 text-white">
                <span className="text-white">
                  Proceed to Checkout
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
