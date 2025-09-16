import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

/**
 * Header
 *  - Logo
 *  - Nav Items
 * Body
 *  - Search
 *  - RestaurantContainer
 *    - RestaurantCard
 *      - Img
 *      - Name of Restaurant, Star Rating, cuisine, delivery time
 * Footer
 *  - Copyright
 *  - Links
 *  - Address
 *  - Contact
 */

// Footer component for footer section

export const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default AppLayout;
