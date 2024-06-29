import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuCard from '../components/MenuCard';

const Home = () => {
  const [menu, setMenu] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/getmenu"); 
      setMenu(response.data);
    } catch (error) {
      console.error('Error faced in fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='h-screen bg-orange-100'>
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {menu.map((menuItem, index) => (
          <MenuCard
            key={index}
            name={menuItem.name}
            description={menuItem.description}
            price={menuItem.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
