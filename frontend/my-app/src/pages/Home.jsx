import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuCard from "../components/MenuCard";
import Shimmer from "../components/Shimmer";

const Home = () => {
  const [menu, setMenu] = useState([]);
  const [loading , setloading] = useState(false);
  const fetchData = async () => {
     setloading(true);
    try {
      const response = await axios.get(
        "https://food-restaurent-plum.vercel.app/api/v1/getmenu"
      );
      setMenu(response.data);
      setloading(false);
    } catch (error) {
      console.error("Error faced in fetching data:", error);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-full bg-orange-100">
      <div className="flex flex-wrap justify-center gap-4 p-4">

         { loading?(<Shimmer/>):( menu.map((menuItem) => (
          <MenuCard
            key={menuItem._id}
            id={menuItem._id}
            name={menuItem.name}
            description={menuItem.description}
            price={menuItem.price}
            image={menuItem.image || ""}
          />
        )))}
       
      </div>
    </div>
  );
};

export default Home;
