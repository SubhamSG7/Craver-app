import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlacedOrders } from '../Api/getplacedorders';
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaShoppingCart,
  FaHourglassHalf,
  FaMapMarkerAlt,
  FaTag,
  FaBox,
} from 'react-icons/fa'; 
import { updateOrderStatus } from '../Api/updateOrderStatus';

function TrackOrders() {
  const dispatch = useDispatch();
  const { orders ,updateStatus} = useSelector((state) => state.placedorders);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    dispatch(getPlacedOrders());
  }, [dispatch,updateStatus]);

  const handleStatusChange = (orderId, status) => {
    setEditingOrderId(orderId);
    setNewStatus(status);
  };

  const handleUpdateStatus = async (orderId) => {
    if (newStatus) {
      dispatch(updateOrderStatus({orderId,newStatus}))
      setEditingOrderId(null);
      setNewStatus('');
    }
  };

  const renderStatusBadge = (status) => {
    let badgeStyles = '';
    let icon = null;

    switch (status) {
      case 'placed':
        badgeStyles = 'bg-green-200 text-green-800';
        icon = <FaShoppingCart className="inline mr-1" />;
        break;
      case 'preparing':
        badgeStyles = 'bg-orange-200 text-orange-800';
        icon = <FaClock className="inline mr-1 animate-spin" />;
        break;
      case 'dispatched':
        badgeStyles = 'bg-blue-200 text-blue-800';
        icon = <FaCheckCircle className="inline mr-1" />;
        break;
      case 'delivered':
        badgeStyles = 'bg-teal-200 text-teal-800';
        icon = <FaCheckCircle className="inline mr-1" />;
        break;
      case 'processing':
        badgeStyles = 'bg-yellow-200 text-yellow-800';
        icon = <FaHourglassHalf className="inline mr-1 animate-spin" />;
        break;
      default:
        badgeStyles = 'bg-gray-200 text-gray-800';
        icon = <FaTimesCircle className="inline mr-1" />;
    }

    return (
      <span
        className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full shadow-md ${badgeStyles} transition duration-200 hover:shadow-lg`}
      >
        {icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-xl transition-shadow hover:shadow-2xl">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Order Status</h2>
      {orders && orders.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  <FaTag className="inline mr-1" /> Order ID: {order._id}
                </h3>
                <p className="text-gray-600">
                  <FaMapMarkerAlt className="inline mr-1" /> Address: {order.address}
                </p>
              </div>
              <div className="mb-4">
                <h4 className="text-md font-semibold text-gray-800">
                  <FaBox className="inline mr-1" /> Products:
                </h4>
                {order.products.map((product) => (
                  <div key={product.id} className="flex items-center mb-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-md shadow-md mr-3"
                    />
                    <span className="text-gray-800">{product.name}</span>
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <h4 className="text-md font-semibold text-gray-800">Status:</h4>
                {renderStatusBadge(order.orderStatus)}
              </div>
              <div className="flex justify-between items-center">
                {editingOrderId === order._id ? (
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="px-2 py-1 text-sm rounded-lg border border-gray-300"
                  >
                    <option value="placed">Placed</option>
                    <option value="preparing">Preparing</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                  </select>
                ) : (
                  <button
                    onClick={() => handleStatusChange(order._id, order.orderStatus)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                  >
                    Edit Status
                  </button>
                )}
                {editingOrderId === order._id && (
                  <button
                    onClick={() => handleUpdateStatus(order._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-10">
          <img
            src="https://www.svgrepo.com/show/286496/no-data.svg"
            alt="No orders"
            className="w-64 h-64 mb-4"
          />
          <p className="text-lg text-gray-600">Oops! No orders Available...</p>
        </div>
      )}
    </div>
  );
}

export default TrackOrders;
