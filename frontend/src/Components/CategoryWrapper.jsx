import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../Slices/cartSlice';
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr';

function CategoryWrapper({ data }) {
  const { image, cuisine, description, discount, name, price } = data;
  const { cartList } = useSelector(state => state.cart);
  
  const dispatch = useDispatch();
  
  function handleAddCart(id) {
    dispatch(setCart(id));
  }

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-1">{cuisine}</p>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-gray-800">{price} ₹</span>
          {discount && (
            <span className="text-red-600 text-sm font-semibold">
              {discount}% Off
            </span>
          )}
        </div>
        {cartList[data._id] ? (
          <div className="flex items-center justify-between">
            <GrFormAdd 
              onClick={() => handleAddCart({ id: data._id, type: +1 })}
              className="text-gray-600 cursor-pointer hover:text-blue-500 transition-colors text-4xl"
            />
            <p className="text-gray-800 font-semibold">{cartList[data._id]}</p>
            <GrFormSubtract 
              onClick={() => handleAddCart({ id: data._id, type: -1 })}
              className="text-gray-600 cursor-pointer hover:text-red-500 transition-colors text-4xl"
            />
          </div>
        ) : (
          <button 
            className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            onClick={() => handleAddCart({ id: data._id, type: "addcart" })}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default CategoryWrapper;
