import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlacedOrders } from "../Api/getplacedorders";
import { FaTimes } from "react-icons/fa";

function Orders() {
  const { orders } = useSelector((state) => state.placedorders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlacedOrders());
  }, [dispatch]);

  const handleCancel = (orderId) => {
    // Cancel order logic here
  };

  const calculateTotal = (products) => {
    return products.reduce((total, product) => {
      const discountedPrice = product.price * 0.9; // Assuming a 10% discount
      return total + discountedPrice * product.quantity;
    }, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-purple-700">Your Orders</h2>
      {orders && orders.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-purple-200 border-b">
              <th className="py-4 px-6 text-left text-lg font-semibold text-purple-800">Order ID</th>
              <th className="py-4 px-6 text-left text-lg font-semibold text-purple-800">Products</th>
              <th className="py-4 px-6 text-left text-lg font-semibold text-purple-800">Total Amount (after discount)</th>
              <th className="py-4 px-6 text-left text-lg font-semibold text-purple-800">Order Status</th>
              <th className="py-4 px-6 text-left text-lg font-semibold text-purple-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-purple-50 transition duration-200">
                <td className="py-3 px-6 text-gray-700">{order._id}</td>
                <td className="py-3 px-6">
                  {order.products.map((product) => (
                    <div key={product.id} className="flex items-center mb-2">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-16 h-16 object-cover rounded-lg shadow-sm mr-3" 
                      />
                      <span className="text-gray-800 font-medium">{product.name} (x{product.quantity})</span>
                    </div>
                  ))}
                </td>
                <td className="py-3 px-6 text-purple-600 font-bold">₹{calculateTotal(order.products)}</td>
                <td className="py-3 px-6">
                  <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${order.orderStatus === 'placed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td className="py-3 px-6">
                  <button 
                    onClick={() => handleCancel(order._id)} 
                    className="flex items-center text-red-600 hover:text-red-800 transition duration-200"
                  >
                    <FaTimes className="mr-1" /> Cancel Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600 text-center mt-4">No orders found.</p>
      )}
    </div>
  );
}

export default Orders;
