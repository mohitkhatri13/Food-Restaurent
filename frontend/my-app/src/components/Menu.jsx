import { useEffect, useState } from "react";
import axios from "axios";

const ViewCategories = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [menuItems, setMenuItems] = useState({});

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/getcategories");
        setCategories(response.data.data);
      } catch (error) {
        console.log("Something went wrong while fetching categories", error);
      }
    }

    fetchCategories();
  }, []);

  const fetchMenuItems = async (categoryName) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/getmenu/${categoryName}`);
      console.log(response)
      setMenuItems((prev) => ({
        ...prev,
        [categoryName]: response.data,
      }));
    } catch (error) {
      console.log("Something went wrong while fetching menu items", error);
    }
  };

  const handleCategoryClick = (categoryName) => {
    if (activeCategory === categoryName) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryName);
      if (!menuItems[categoryName]) {
        fetchMenuItems(categoryName);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category._id} className="border rounded-lg shadow-md">
            <h2
              className="bg-gray-100 p-4 cursor-pointer font-semibold hover:bg-gray-200"
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </h2>
            <div className={`overflow-hidden transition-max-height duration-300 ${activeCategory === category.name ? 'max-h-96' : 'max-h-0'}`}>
              {activeCategory === category.name && menuItems[category.name] ? (
                <ul className="p-4 space-y-2">
                  {menuItems[category.name].map((item) => (
                    <li key={item._id} className="border-b pb-2">
                      <div className="flex justify-between">
                        <span>{item.name}</span>
                        <span>${item.price}</span>
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCategories;
