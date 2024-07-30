import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuCard from "../components/MenuCard";
import Shimmer from "../components/Shimmer";
import Hero from "../components/HeroSection"; 
import History from "../components/History";
import '../App.css'; // Ensure this imports your styles
import ItemSwiper from "../components/ItemSwiper";
import Footer from "../components/common/Footer";
const Home = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("all");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://food-restaurent-c1px.vercel.app/api/v1/getmenu"
      );
      setMenu(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error faced in fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  const filteredMenu = category === "all" 
    ? menu 
    : menu.filter(item => item.category === category);

  return (
    <div className="h-full ">
      <Hero />
      <History />
    
      <div className="flex flex-col items-center justify-center">
        <h2 className="font-satisfy text-4xl font-semibold mb-4 mt-6">Menu</h2>
        <p className="text-md">Check Our Tasty Menu</p>
      </div>

      <ul className="flex justify-center mb-4 space-x-2 mt-6">
        <li 
          className={`cursor-pointer w-24 text-center ${category === 'all' ? 'font-bold bg-yellow-400 px-3 py-1 rounded-2xl text-white' : ''}`} 
          onClick={() => handleCategoryClick('all')}
        >
          All
        </li>
        <li 
          className={`hover:font-bold cursor-pointer w-24 text-center ${category === 'drinks' ? 'font-bold bg-yellow-400 px-3 py-1 rounded-2xl text-white' : ''}`} 
          onClick={() => handleCategoryClick('drinks')}
        >
          Drinks
        </li>
        <li 
          className={`hover:font-bold cursor-pointer w-24 text-center ${category === 'appetizer' ? 'font-bold bg-yellow-400 px-3 py-1 rounded-2xl text-white' : ''}`} 
          onClick={() => handleCategoryClick('appetizer')}
        >
          Appetizer
        </li>
        <li 
          className={`hover:font-bold cursor-pointer w-24 text-center ${category === 'snacks' ? 'font-bold bg-yellow-400 px-3 py-1 rounded-2xl text-white' : ''}`} 
          onClick={() => handleCategoryClick('snacks')}
        >
          Snacks
        </li>
        <li 
          className={`hover:font-bold cursor-pointer w-24 text-center ${category === 'dinner' ? 'font-bold bg-yellow-400 px-3 py-1 rounded-2xl' : ''}`} 
          onClick={() => handleCategoryClick('dinner')}
        >
          Dinner
        </li>
      </ul>

      <div className="flex flex-wrap justify-center gap-4 p-4">
        {loading ? (
          <Shimmer />
        ) : (
            <ItemSwiper Items = {filteredMenu}/>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
