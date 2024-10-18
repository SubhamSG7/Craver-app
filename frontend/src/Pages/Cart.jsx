import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyCartList, removeFromCart, setCartToShow } from "../Slices/cartSlice";
import { Checkout } from "../Api/Checkout";
import { getAddress } from "../Api/getAddress";
import { MdLocationOn } from 'react-icons/md'; 
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate=useNavigate()
  const { cartList, cartToShow } = useSelector((state) => state.cart);
  const { categories } = useSelector((state) => state.category);
  const { selectedRestaurantId } = useSelector(state => state.restaurant);
  const { address } = useSelector(state => state.users);
  const {status}=useSelector(state=>state.cart);   
  const dispatch = useDispatch();
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    dispatch(getAddress());
    dispatch(setCartToShow(categories));
  }, [cartList, dispatch]);
  useEffect(()=>{
    if(status==="success"){
      dispatch(emptyCartList())
      navigate("/ordersuccess")
    }
  },[status])
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    if (address === "Not Provided") {
      setShowAddressPopup(true); 
      return;
    }

    const restaurantId = selectedRestaurantId;
    const cartData = cartToShow.map((val) => {
      const discountedPrice = val.price * ((100 - val.discount) / 100);
      return { id: val._id, quantity: val.quantity, price: discountedPrice, image: val.image, name: val.name};
    });
    dispatch(Checkout({ restaurantId, cartData,address }));
  };

  const handleAddressSubmit = () => {
    if(newAddress.length>5){
      const restaurantId = selectedRestaurantId;
      const cartData = cartToShow.map((val) => {
        const discountedPrice = val.price * ((100 - val.discount) / 100);
        return { id: val._id, quantity: val.quantity, price: discountedPrice, image: val.image, name: val.name};
      });
      console.log(cartData);
      
      dispatch(Checkout({ restaurantId, cartData,address:newAddress }));
    }
    setShowAddressPopup(false); 
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
            {address === "Not Provided" && (
              <button
                className="mt-4 flex items-center text-blue-500"
                onClick={() => setShowAddressPopup(true)}
              >
                <MdLocationOn className="mr-2" size={24} />
                Set Address
              </button>
            )}
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
      {showAddressPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
            <h2 className="text-2xl font-bold mb-4">We dont have your address to deliver enter you address...</h2>
            <input
              type="text"
              value={newAddress}
              required
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter your address"
              className="border p-2 w-full rounded-md mb-4"
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
                onClick={handleAddressSubmit}
              >
                Submit
              </button>
              <button
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
                onClick={() => setShowAddressPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
