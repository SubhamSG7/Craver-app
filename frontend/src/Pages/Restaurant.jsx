import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { GetCategory } from "../Api/GetCategory";
import PageLoaders from "../Loaders/PageLoaders";
import CategoryWrapper from "../Components/CategoryWrapper";
import Filter from "../Components/Filter";
import { setSelectedRestaurantId } from "../Slices/restaurantSlice";

function Restaurant() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartList } = useSelector((state) => state.cart);
  const { apiStatus, categories, filteredData } = useSelector(
    (state) => state.category
  );
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    dispatch(setSelectedRestaurantId(id)); // saving id
    dispatch(GetCategory(id)); // api call to get the category
  }, [dispatch, id]);

  if (apiStatus === "loading") {
    return <PageLoaders />;
  }

  const dataToRender =
    filteredData && filteredData.length > 0 ? filteredData : categories;

  return (
    <div className="w-full py-6 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Restaurant Categories
      </h1>

      <Filter />

      <div className="flex flex-wrap justify-between gap-4">
        {filteredData === "Not Found" ? (
          <div className="w-full text-center text-lg text-gray-500">
            Sorry, no items found.
          </div>
        ) : (
          dataToRender &&
          dataToRender.map((val) => (
            <div
              key={val?._id}
              className=" w-[30%] flex flex-wrap justify-between  min-h-[300px] transform hover:scale-105 transition-transform duration-300 mt-4"
            >
              <CategoryWrapper key={val._id} data={val} />
            </div>
          ))
        )}
      </div>

      {Object.keys(cartList).length > 0 && (
        <div className="fixed bottom-4 right-4 bg-indigo-600 text-white rounded-xl shadow-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl">
          <p className="font-semibold text-center text-lg">
            🛒 You have items in your cart! Ready to checkout?
          </p>
          <button
            className="mt-3 w-full bg-white text-indigo-600 font-semibold py-2 rounded-full hover:bg-indigo-200 transition-colors"
            onClick={() => {
              navigate("/cart");
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Restaurant;
