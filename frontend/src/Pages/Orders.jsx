import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlacedOrders } from "../Api/getplacedorders";
import { FaTimes, FaShoppingCart, FaDollarSign, FaClipboardList } from "react-icons/fa"; // Importing additional icons
import { cancelOrder } from "../Api/cancelOrder";

function Orders() {
  const { orders, cancelorderStatus } = useSelector((state) => state.placedorders);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPlacedOrders());
  }, [dispatch, cancelorderStatus]);

  const handleCancel = (orderId, userId, restaurantId) => {
    dispatch(cancelOrder({ orderId, userId, restaurantId }));
  };

  const calculateTotal = (products) => {
    return products.reduce((total, product) => {
      const discountedPrice = product.price * 0.9; 
      return total + discountedPrice * product.quantity;
    }, 0).toFixed(2);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-xl transition-shadow hover:shadow-2xl">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        <FaClipboardList className="inline mr-2" /> Orders
      </h2>
      {orders && orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-white">Order ID</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-white">Products</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-white">Total Amount</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-white">Status</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <td className="py-3 px-4 text-gray-600">
                    <FaClipboardList className="inline mr-1" /> {order._id}
                  </td>
                  <td className="py-3 px-4">
                    {order.products.map((product) => (
                      <div key={product.id} className="flex items-center mb-1">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-14 h-14 object-cover rounded-md shadow-md mr-3 hover:opacity-90 transition duration-200"
                        />
                        <span className="text-gray-800 font-medium">
                          {product.name} (x{product.quantity})
                        </span>
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-4 text-gray-900 font-extrabold">
                    <FaDollarSign className="inline mr-1" /> ₹{calculateTotal(order.products)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        order.orderStatus === "placed"
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleCancel(order._id, order.userId, order.restaurantId)}
                      className="flex items-center text-red-600 hover:text-red-800 transition duration-300 ease-in-out transform hover:scale-110"
                    >
                      <FaTimes className="mr-2" /> Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-10">
          <p className="text-lg text-gray-600">You haven't placed any orders yet. When you do, they'll show up here!</p>
        </div>
      )}
    </div>
  );
}

export default Orders;
