import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = useSelector((state) => state.auth.user);
  console.log(userId);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://food-restaurent-plum.vercel.app/v1/getuserorder/${userId?._id}`);
        if (response?.data?.success) {
          setOrders(response?.data?.data);
        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders. Please try again.');
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  return (
    <div className='w-full flex flex-col items-center justify-center'>
    <div className="p-4 lg:w-[50%] w-11/12">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Order ID: {order._id}</h3>
              <p className="text-gray-700 mb-2">Total Price: Rs-{order.totalPrice}</p>
              <p className="text-gray-700 mb-2">Status: {order.status ? 'Completed' : 'Pending'}</p>
              <ul className="list-disc pl-4">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - Rs-{item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default ViewOrders;
