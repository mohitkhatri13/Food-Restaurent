import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slice/cartSlice';
import toast from 'react-hot-toast';

const MenuCard = ({ id, name, description, price, image }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isCustomer = useSelector((state) => state.role.isCustomer);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      toast.error('Please log in first.');
      return;
    } else if (!isLoggedIn || !isCustomer) {
      toast.error('Please log in as a customer to add to cart.');
      return;
    }
    dispatch(addToCart({ id, name, price }));
    toast.success(`${name} added to cart!`);
  };

  return (
    <div className="border p-4 rounded shadow-lg bg-white w-80 flex flex-col hover:scale-105 transition-all duration-300 ">
      <h2 className="text-xl mt-2 mb-4 font-bold">{name}</h2>
      {image && <img src={image} alt={name} loading='lazy' className="w-full h-48 object-cover rounded-t " />}
      <p className="text-gray-700">{description}</p>
      <p className="text-lg font-bold">Rs-{price}</p>
      <button
        onClick={handleAddToCart}
        className=" mt-2 scale-75 lg:scale-100 max-w-fit bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700 lg:hover:scale-95"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MenuCard;
