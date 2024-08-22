import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, incrementQuantity, decrementQuantity } from "../slice/cartSlice"; 
import axios from "axios";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity({ id }));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity({ id }));
  };

  const userId = useSelector((state) => state?.auth?.user);
  
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handleConfirmOrder = async () => {
    try {
      // Validate if cart is empty before proceeding with order placement
      if (cartItems.length === 0) {
        toast.error(
          "Your cart is empty. Please add items before placing an order."
        );
        return;
      }

  
       await axios.post(
        "https://food-restaurent-xi.vercel.app/api/v1/createorder",
        {
          userId: userId,
          items: cartItems,
          totalPrice: totalPrice,
        }
      );

      
      dispatch({ type: "cart/clearCart" }); 

      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return ( <div className="w-full flex flex-col items-center justify-center">
    <div className="p-4 lg:w-[50%] w-11/12 ">
      <h2 className="text-2xl font-semibold mb-4">Cart</h2>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li key={item.id} className="border p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-700">
                  Rs-{item.price} x {item.quantity}
                </p>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecrementQuantity(item.id)}
                    className="text-red-600 hover:text-red-800 focus:outline-none"
                  >
                    <FaMinus />
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrementQuantity(item.id)}
                    className="text-orange-600 hover:text-orange-800 focus:outline-none"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="text-red-600 hover:text-red-800 focus:outline-none"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Total Price: Rs-{totalPrice}</h3>
        <button
          onClick={handleConfirmOrder}
          className={`mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700 ${
            cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={cartItems.length === 0}
        >
          Confirm Order
        </button>
      </div>
    </div>
    </div>
  );
};

export default Cart;
