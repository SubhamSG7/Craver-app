import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlacedOrders } from "../Api/getplacedorders";
import { FaTimes, FaDollarSign, FaClipboardList } from "react-icons/fa";
import { cancelOrder } from "../Api/cancelOrder";

function Orders() {
  const { orders, cancelorderStatus } = useSelector(
    (state) => state.placedorders
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlacedOrders());
  }, [dispatch, cancelorderStatus]);

  const handleCancel = (orderId, userId, restaurantId) => {
    dispatch(cancelOrder({ orderId, userId, restaurantId }));
  };

  const calculateTotal = (products) => {
    return products
      .reduce((total, product) => {
        const discountedPrice = product.price * 0.9;
        return total + discountedPrice * product.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        <FaClipboardList className="inline mr-2" /> Orders
      </h2>
      {orders && orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-t border-b border-gray-300">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-3 text-left text-sm font-semibold text-gray-600">
                  Order ID
                </th>
                <th className="py-2 px-3 text-left text-sm font-semibold text-gray-600">
                  Products
                </th>
                <th className="py-2 px-3 text-left text-sm font-semibold text-gray-600">
                  Total Amount
                </th>
                <th className="py-2 px-3 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="py-2 px-3 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3 text-gray-700">{order._id}</td>
                  <td className="py-2 px-3 text-gray-700">
                    {order.products.map((product) => (
                      <div key={product.id} className="flex items-center mb-1">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded mr-2"
                        />
                        <span>
                          {product.name} (x{product.quantity})
                        </span>
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-3 text-gray-900 font-semibold">
                    <FaDollarSign className="inline mr-1" /> ₹
                    {calculateTotal(order.products)}
                  </td>
                  <td className="py-2 px-3">
                    <span
                      className={`text-sm font-medium ${
                        order.orderStatus === "placed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {order.orderStatus.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() =>
                        handleCancel(
                          order._id,
                          order.userId,
                          order.restaurantId
                        )
                      }
                      className="text-red-500 border-b-2 border-transparent hover:border-red-500 focus:outline-none"
                    >
                      <FaTimes className="inline mr-1" /> Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-8">
          <p className="text-md text-gray-500">
            You haven't placed any orders yet. When you do, they'll show up
            here!
          </p>
        </div>
      )}
    </div>
  );
}

export default Orders;
