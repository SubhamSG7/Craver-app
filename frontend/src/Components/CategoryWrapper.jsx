import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../Slices/cartSlice";
import { GrFormAdd, GrFormSubtract } from "react-icons/gr";
import { AiOutlineShoppingCart } from "react-icons/ai";

function CategoryWrapper({ data }) {
  const { image, cuisine, description, discount, name, price } = data;
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  function handleAddCart(id) {
    dispatch(setCart(id));
  }

  return (
    <div className=" bg-gradient-to-tr from-yellow-400 via-orange-400 to-pink-500 shadow-lg rounded-3xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer">

      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-t-3xl transition-transform duration-500 transform hover:scale-110"
      />
      <div className="p-6 bg-white rounded-b-3xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          {name}
        </h3>
        <p className="text-gray-500 text-sm mb-1 text-center">{cuisine}</p>
        <p className="text-gray-600 text-sm mb-4 text-center">{description}</p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-gray-900">₹{price}</span>
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
              className="text-gray-600 cursor-pointer hover:text-green-500 transition-colors text-4xl"
            />
            <p className="text-gray-800 font-semibold text-lg">
              {cartList[data._id]}
            </p>
            <GrFormSubtract
              onClick={() => handleAddCart({ id: data._id, type: -1 })}
              className="text-gray-600 cursor-pointer hover:text-red-500 transition-colors text-4xl"
            />
          </div>
        ) : (
          <button
            className="mt-4 w-full bg-gradient-to-r from-pink-400 via-red-400 to-yellow-500 text-white font-semibold py-2 rounded-lg hover:from-pink-500 hover:via-red-500 hover:to-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50 transition-colors"
            onClick={() => handleAddCart({ id: data._id, type: "addcart" })}
          >
            <AiOutlineShoppingCart className="inline-block mr-2 text-2xl" />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default CategoryWrapper;
