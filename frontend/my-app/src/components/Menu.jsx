import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slice/cartSlice";
import toast from "react-hot-toast";
import MoonLoader from "react-spinners/MoonLoader";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [menuItems, setMenuItems] = useState({});
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isCustomer = useSelector((state) => state.role.isCustomer);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    async function fetchCategories() {
      try {
        const response = await axios.get(
          "https://food-restaurent-xi.vercel.app/api/v1/getcategories"
        );
        setCategories(response?.data?.data);
        setloading(false);
      } catch (error) {
        console.log("Something went wrong while fetching categories", error);
        setloading(false);
      }
    }

    fetchCategories();
  }, []);

  const fetchMenuItems = async (categoryName) => {
    try {
      const response = await axios.get(
        `https://food-restaurent-xi.vercel.app/api/v1/getmenu/${categoryName}`
      );
      setMenuItems((prev) => ({
        ...prev,
        [categoryName]: response?.data,
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

  const handleAddToCart = (item) => {
    if (!isLoggedIn) {
      toast.error("Please log in first.");
      return;
    }
    if (!isCustomer) {
      toast.error("Please log in as a customer to add to cart.");
      return;
    }
    dispatch(addToCart({ id: item._id, name: item.name, price: item.price }));
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="w-full realtive">
      <div className="  max-w-4xl mx-auto p-4 ">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <MoonLoader className="" color="#eb8e05" size={60} />
          </div>
        ) : (
          <div>
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
                  <div
                    className={`overflow-hidden transition-max-height duration-300 ${
                      activeCategory === category.name ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    {activeCategory === category.name &&
                    menuItems[category.name] ? (
                      <ul className="p-4 space-y-2">
                        {menuItems[category.name].map((item) => (
                          <li key={item._id} className="border-b pb-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-semibold">
                                  {item.name}
                                </span>
                                <span className="ml-2 text-gray-600">
                                  (Rs-{item.price})
                                </span>
                                <p className="text-sm text-gray-600">
                                  {item.description}
                                </p>
                              </div>
                              <button
                                onClick={() => handleAddToCart(item)}
                                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700"
                              >
                                Add to Cart
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className=" w-full bottom-0">{/* <Footer /> */}</div>
    </div>
  );
};

export default Menu;
