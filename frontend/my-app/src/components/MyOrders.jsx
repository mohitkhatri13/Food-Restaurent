import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import MoonLoader from "react-spinners/MoonLoader";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  console.log(userId);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://food-restaurent-xi.vercel.app/api/v1/getuserorder/${userId?._id}`
        );
        if (response?.data?.data.length > 0) {
          setOrders(response?.data?.data);
        }
        setLoading(false);
        return;
      } catch (error) {
        // console.error('Error fetching orders:', error);
        // toast.error('Failed to fetch orders. Please try again.');
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <MoonLoader className="" color="#eb8e05" size={60} />
        </div>
      ) : (
        <div className="p-4 lg:w-[50%] w-11/12 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-4 text-orange-500">My Orders</h2>
          {orders.length === 0 ? (
            <p className="text-xl font bold">No orders found.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border p-4 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    Order ID: {order._id}
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Total Price: Rs-{order.totalPrice}
                  </p>
                  <p className="text-gray-700 mb-2">
                    Status: {order.status ? "Completed" : "Pending"}
                  </p>
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
      )}
    </div>
  );
};

export default ViewOrders;
