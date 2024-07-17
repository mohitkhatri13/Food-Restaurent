import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slice/cartSlice';
import toast from 'react-hot-toast';
import Button from './common/Button';

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
    <div className=" relative p-4 h-[400px] rounded shadow-lg w-80 flex flex-col ">
    <h2 className="text-xl mb-2 font-bold">{name}</h2>
  
    <div
      className="h-44 w-full bg-cover bg-center mb-2"
      style={{ backgroundImage: `url(${image})` }}
      title={name}
    ></div>
  
    <p className="text-gray-700 text-[18px] mb-2">{description}</p>
    <p className="text-lg font-bold mb-2">Rs-{price}</p>
    <div className='absolute bottom-4 translate-x-[50%]'>
    <Button
     onClick={handleAddToCart}>Add to Cart</Button>
     </div>
  </div>
  
  );
};

export default MenuCard;
