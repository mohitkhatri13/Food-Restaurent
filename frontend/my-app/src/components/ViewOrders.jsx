import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import MoonLoader from "react-spinners/MoonLoader";
import { use } from "react";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        setLoading(true);
        // on local localapi work then verify this after deployment 
        const response = await axios.get(
          "https://food-restaurent-xi.vercel.app/api/v1/getpendingorders"
        );
        setLoading(false);
        const dataarray = response?.data?.data;
        console.log("length", dataarray.length);
        if (dataarray.length > 0) {
          setOrders(dataarray);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders. Please try again.");
        setLoading(true);
      }
    };

    fetchPendingOrders();
  }, []);

  const handleStatusToggle = async (orderId, currentStatus) => {
    try {
      await axios.put(
        "https://food-restaurent-xi.vercel.app/api/v1/setorderstatus",
        {
          orderId,
          status: !currentStatus,
        }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: !currentStatus } : order
        )
      );
      toast.success("Order status updated successfully!");
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status. Please try again.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <MoonLoader className="" color="#eb8e05" size={60} />
        </div>
      ) : (
        <div className="p-4 lg:w-[50%] w-11/12 flex flex-col items-center justify-center">
          <Toaster />
          <h2 className="text-2xl font-semibold mb-4 text-orange-500">
            Pending Orders
          </h2>

          {orders.length == 0 ? (
            <div className=" text-xl font-bold">
              Well Done ! All Orders get completed
            </div>
          ) : (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li key={order._id} className="border p-4 rounded-lg shadow-md">
                  <div className="flex flex-col lg:flex-row justify-between items-center">
                    <div className="flex flex-col ">
                      <h3 className="text-lg font-semibold">
                        Order ID: {order._id}
                      </h3>
                      <p className="text-gray-700">
                        User:{" "}
                        {order.user
                          ? `${order.user.firstName} ${order.user.lastName}`
                          : "Unknown"}
                      </p>
                      <p className="text-gray-700">
                        Email: {order.user ? order.user.email : "Unknown"}
                      </p>

                      <ul className="mt-2">
                        {order.items.map((item, index) => (
                          <li key={index} className="text-gray-700">
                            {item.name} - Rs{item.price} x {item.quantity}
                          </li>
                        ))}
                      </ul>
                      <p className="text-gray-700 mt-2">
                        Total Price: Rs{order.totalPrice}
                      </p>
                      <p className="text-gray-700 mt-2">
                        Status: {order.status ? "Completed" : "Pending"}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleStatusToggle(order._id, order.status)
                      }
                      className={`ml-4 mt-10 py-2 px-4 rounded ${
                        order.status ? "bg-red-700" : "bg-orange-500"
                      } text-white`}
                    >
                      {order.status ? "Mark as Pending" : "Mark as Completed"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
