import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../slice/cartSlice"; // Adjust the import path accordingly
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const userId = useSelector((state) => state?.auth?.user);
  // Calculate total price
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

      // Assuming you have an API endpoint to save the order to the database
      const response = await axios.post(
        "http://localhost:3000/api/v1/createorder",
        {
          userId: userId,
          items: cartItems,
          totalPrice: totalPrice,
          // Add any other necessary data here
        }
      );

      // Clear the cart after successful order placement
      dispatch({ type: "cart/clearCart" }); // Replace with your actual action

      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="p-4">
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
          className={`mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 ${
            cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={cartItems.length === 0}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
