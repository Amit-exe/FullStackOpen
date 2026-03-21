import { CiSearch } from "react-icons/ci";
import RestaurantCard from "./Resturant";

import { useEffect, useState } from "react";
import axios from "axios"

const url_res = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.1760819&lng=73.02288949999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
const Body = () => {
  const [topRated, settopRated] = useState(false);
  const [toSearch, setTosearch] = useState('');
  const [showRes, setShowRes] = useState([]);
  const fr = showRes.filter((r)=>r.info.name.toLowerCase().includes(toSearch.toLowerCase()));

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



  useEffect(()=>{
let rest;
    async function fetchDetails() {
    const json = await axios.get(url_res);
     rest = json?.data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    console.log(rest);
    setShowRes(rest)
    }

    fetchDetails();
    

  },[])


    const handleSearch = (e)=>{
    console.log(e.target.value);
    setTosearch(e.target.value);
  
    
  }

  if(!showRes)
    return <h1>Loading...</h1>

  return (
    <div className="body">
      <div className="search-box">
        <input placeholder="search"  value={toSearch} onChange={(e)=>{handleSearch(e)}}/>
        <CiSearch className="search-icon" />
      </div>
      <button onClick={topRatedRes} className="m-5 p-5 text-3xl bg-amber-300 ">
        {topRated ? "show all" : "Top Rate"}
      </button>
      <div className="restaurant-container">
        {fr.map((restaurant) => (
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
