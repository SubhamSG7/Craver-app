import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, setCartToShow } from "../Slices/cartSlice";

function Cart() {
  const { cartList, cartToShow } = useSelector((state) => state.cart);
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCartToShow(categories));
  }, [cartList, dispatch]);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    // Checkout logic here
  };

  const totalAmount = cartToShow.reduce(
    (total, item) =>
      total + item.price * item.quantity * ((100 - item.discount) / 100),
    0
  );

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        🛒 Your Shopping Cart
      </h1>

      {cartToShow.length > 0 ? (
        <div className="space-y-8">
          {cartToShow.map((item) => {
            const { _id, name, image, price, quantity, discount } = item;
            const discountedPrice = price * ((100 - discount) / 100);
            const itemTotal = discountedPrice * quantity;

            return (
              <div
                key={_id}
                className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg rounded-lg overflow-hidden p-6 transition-all hover:shadow-xl"
              >
                <img
                  src={image}
                  alt={name}
                  className="w-28 h-28 object-cover rounded-md mr-6 border border-gray-300"
                />
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {name}
                  </h3>
                  <p className="text-lg text-gray-600 mt-2">
                    Original Price:{" "}
                    <span className="line-through text-red-500">
                      ₹{price.toFixed(2)}
                    </span>{" "}
                    <span className="text-green-600 font-bold">
                      ₹{discountedPrice.toFixed(2)} ({discount}% off)
                    </span>
                  </p>
                  <p className="text-lg text-gray-600">Quantity: {quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">
                    ₹{itemTotal.toFixed(2)}
                  </p>
                  <button
                    className="text-red-600 hover:text-red-800 mt-4 font-semibold"
                    onClick={() => handleRemoveFromCart(_id)}
                  >
                    ✖ Remove
                  </button>
                </div>
              </div>
            );
          })}

          <div className="border-t-2 pt-6 flex flex-col items-end">
            <h2 className="text-3xl font-bold text-gray-900">
              Total Amount: ₹{totalAmount.toFixed(2)}
            </h2>
            <button
              className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h3 className="text-2xl text-gray-500">Oops, your cart is empty!</h3>
          <p className="text-lg text-gray-400 mt-4">
            Start adding some products to your cart and enjoy shopping!
          </p>
        </div>
      )}
    </div>
  );
}

export default Cart;
