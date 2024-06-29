import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const ViewOrders = () => {
  const [data, setData] = useState([]);
  const isCustomer = useSelector((state) => state.role.isCustomer);
  const token = useSelector((state) => state.auth.token); // Fetch token from Redux

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/incomingorders", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(response.data.data); // Assuming the data is in response.data.data
      console.log(response.data.data);
    } catch (error) {
      console.log("Something went wrong while calling the pending order API", error);
    }
  }

  useEffect(() => {
    if (!isCustomer) {
      fetchData();
    }
  }, [isCustomer]);

  return (
    <div>
      <h1>Incoming Orders</h1>
      <ul>
        {data.map(order => (
          <li key={order._id}>
            <h2>Order ID: {order._id}</h2>
            <p>Table Number: {order.tableNumber}</p>
            <p>Total Amount: {order.totalAmount}</p>
            <ul>
              {order.items.map(item => (
                <li key={item._id}>
                  {item.menuItem.name} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewOrders;
