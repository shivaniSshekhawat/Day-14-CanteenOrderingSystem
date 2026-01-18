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
        "https://mocki.io/v1/09ad0bfa-9d56-4f74-8cae-f8884d41bb5b",
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

    // Ultimate fallback: Create sample fictional data
    const sampleData = {
      restaurants: [
        {
          id: "res_sample_001",
          name: "Sample Kitchen",
          rating: 4.5,
          cuisine: "Mixed",
          address: "123 Learning Street, Code City",
          image_url: "https://picsum.photos/800/600?random=sample1",
          menu: [
            {
              item_id: "res_sample_001_m01",
              name: "Sample Dish",
              description: "A delicious sample dish for learning purposes",
              price: 199.99,
              image: "https://picsum.photos/400/300?random=sampledish1",
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
