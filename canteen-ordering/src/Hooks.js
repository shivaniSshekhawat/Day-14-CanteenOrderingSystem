import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRestaurantData } from "./Store/app";

export function useGetResaturantData() {
  const dispatch = useDispatch();
  const restaurantData = useSelector((state) => state.app.restaurantData);
  async function getData() {
    console.log("Loading restaurant data...");
    try {
      const response = await fetch(
        "https://mocki.io/v1/b983a936-6ee7-4b22-8d0f-d2ef1418a611",
      );
      if (response.ok) {
        const jsonData = await response.json();
        console.log("Loaded data from your API");
        dispatch(setRestaurantData(jsonData.restaurants));
        return;
      }
    } catch (error) {
      console.log("API failed, trying local JSON file");
    }

    // Fallback: Try local JSON file
    try {
      const response = await fetch("/restaurant-data.json");
      if (response.ok) {
        const jsonData = await response.json();
        console.log("Loaded data from local JSON file");
        dispatch(setRestaurantData(jsonData.restaurants));
        return;
      }
    } catch (error) {
      console.log("Local JSON not found, using sample data");
    }

    // Ultimate fallback: Create sample fictional data for EDUCATIONAL PURPOSES ONLY
    // 🚨 LEGAL NOTICE: This is 100% FICTIONAL data for learning React/Redux only
    // All images are from Unsplash (free for commercial use): https://unsplash.com/license
    const sampleData = {
      restaurants: [
        {
          id: "edu_sample_001",
          name: "Learning Kitchen",
          rating: 4.5,
          cuisine: "Educational Vegetarian",
          address: "123 Code Street, Learning City, 12345",
          delivery_time: "15-20 mins",
          image_url:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
          menu: [
            {
              item_id: "edu_sample_001_m01",
              name: "Redux Buddha Bowl",
              description:
                "A nutritious bowl for learning Redux state management concepts",
              price: 185.0,
              category: "Learning Food",
              is_vegetarian: true,
              is_spicy: false,
              image:
                "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
            },
            {
              item_id: "edu_sample_001_m02",
              name: "React Salad",
              description:
                "Fresh components mixed with hooks and state for educational purposes",
              price: 145.0,
              category: "Educational",
              is_vegetarian: true,
              is_spicy: false,
              image:
                "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400",
            },
          ],
        },
        {
          id: "edu_sample_002",
          name: "Code Café",
          rating: 4.7,
          cuisine: "Programming Vegetarian",
          address: "456 Developer Drive, Tech City, 67890",
          delivery_time: "20-25 mins",
          image_url:
            "https://images.unsplash.com/photo-1639024471283-03518883512d?w=800",
          menu: [
            {
              item_id: "edu_sample_002_m01",
              name: "JavaScript Curry",
              description:
                "Spicy curry that teaches asynchronous programming concepts",
              price: 195.0,
              category: "Programming Food",
              is_vegetarian: true,
              is_spicy: true,
              image:
                "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
            },
          ],
        },
      ],
    };

    console.log("Using sample fallback data");
    dispatch(setRestaurantData(sampleData.restaurants));
  }

  useEffect(() => {
    if (restaurantData.length !== 0) return;
    getData();
  }, [restaurantData]);
}
