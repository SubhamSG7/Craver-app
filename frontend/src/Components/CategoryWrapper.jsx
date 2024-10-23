import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../Slices/cartSlice";
import { GrFormAdd, GrFormSubtract } from "react-icons/gr";
import { AiOutlineShoppingCart } from "react-icons/ai";

function CategoryWrapper({ data }) {
  const { image, cuisine, description, discount, name, price } = data;
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Handle adding/removing items to/from cart
  const handleAddCart = (id, type) => {
    dispatch(setCart({ id, type }));
  };

  return (
    <div className="shadow-xl rounded-2xl overflow-hidden w-[100%] bg-white hover:shadow-2xl transition-shadow duration-300 transform hover:scale-100 cursor-pointer">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110 rounded-t-2xl"
      />
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
          {name}
        </h3>
        <p className="text-gray-500 text-sm mb-1 text-center">{cuisine}</p>
        <p className="text-gray-600 text-sm mb-4 text-center">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-800">₹{price}</span>
          {discount && (
            <span className="text-red-500 text-sm font-semibold">
              {discount}% Off
            </span>
          )}
        </div>
        {cartList[data._id] ? (
          <div className="flex justify-between items-center">
            <GrFormSubtract
              onClick={() => handleAddCart(data._id, -1)}
              className="text-gray-600 hover:text-red-500 cursor-pointer text-3xl transition-colors duration-200"
            />
            <span className="text-gray-900 font-semibold text-lg">
              {cartList[data._id]}
            </span>
            <GrFormAdd
              onClick={() => handleAddCart(data._id, 1)}
              className="text-gray-600 hover:text-green-500 cursor-pointer text-3xl transition-colors duration-200"
            />
          </div>
        ) : (
          <button
            onClick={() => handleAddCart(data._id, "addcart")}
            className="w-full py-2 mt-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg transition-colors duration-300 hover:from-blue-600 hover:to-teal-600 focus:ring-4 focus:ring-teal-300 focus:ring-opacity-50"
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
