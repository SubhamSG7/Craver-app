import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../Slices/cartSlice";
import { GrFormAdd, GrFormSubtract } from "react-icons/gr";
import { AiOutlineShoppingCart } from "react-icons/ai";

function CategoryWrapper({ data }) {
  const { image, cuisine, description, discount, name, price } = data;
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAddCart = (id, type) => {
    dispatch(setCart({ id, type }));
  };

  return (
    <div className="shadow-2xl shadow-black rounded-xl overflow-hidden w-[100%] bg-white hover:shadow-2xl transition-shadow duration-300 transform hover:scale-100 cursor-pointer">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110 rounded-t-2xl"
      />
      <div className="p-5">
        <h3 className="text-4xl font-serif font-bold text-gray-600 mb-2 text-center">
          {name}
        </h3>
        <p className="text-gray-600 mb-1 text-center text-xl">{cuisine}</p>
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
            className="w-full py-2 mt-4 border-b-4 border-teal-500 text-teal-500 font-semibold rounded-lg transition-colors duration-300 hover:border-teal-600 hover:bg-teal-100 focus:outline-none"
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
