import { CiSearch } from "react-icons/ci";
import RestaurantCard from "./Resturant";
import restaurantList from "../data/ResturantList";
import { useState } from "react";
const Body = () => {
  const [topRated, settopRated] = useState(false);
  const [showRes, setShowRes] = useState(restaurantList);

  const topRatedRes = () => {
    console.log("top");
    console.log(restaurantList[0].info.avgRating);

    settopRated((prev) => {
      const newState = !prev; // calculate new toggle state
      let updatedRes;

      if (newState) {
        updatedRes = restaurantList.filter((a) => a.info.avgRating > 4.5);
      } else {
        updatedRes = restaurantList;
      }

      setShowRes(updatedRes);
      return newState; // return the updated state
    });
  };

  return (
    <div className="body">
      <div className="search-box">
        <input placeholder="search" />
        <CiSearch className="search-icon" />
      </div>
      <button onClick={topRatedRes} className="m-5 p-5 text-3xl bg-amber-300 ">
        {topRated ? "show all" : "Top Rate"}
      </button>
      <div className="restaurant-container">
        {showRes.map((restaurant) => (
          <RestaurantCard
            key={restaurant.info.id}
            restaurantData={restaurant}
          />
        ))}
      </div>
    </div>
  );
};

export default Body;
