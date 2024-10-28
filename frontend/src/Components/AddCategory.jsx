import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageLoaders from "../Loaders/PageLoaders";
import {
  setDish,
  resetDish,
  setRestaurant,
  setStatus,
} from "../Slices/categorySlice";
import { SendCategory } from "../Api/AddCategory";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaHome } from "react-icons/fa";

function AddCategory() {
  const { dish, restaurant, status, apiStatus } = useSelector(
    (state) => state.category
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = import.meta.env.VITE_BACKEND_API;

  const handleDishSubmission = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("dishname", dish.dishname);
    formData.append("category", dish.category);
    formData.append("cuisine", dish.cuisine);
    formData.append("dishdetail", dish.dishdetail);
    formData.append("price", dish.price);
    formData.append("discount", dish.discount);
    formData.append("restaurant_id", restaurant._id);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    dispatch(SendCategory(formData));
    setFormSubmitted(true);
    dispatch(resetDish());
    setSelectedImage(null);
    setImagePreview(null);
    e.target.reset();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const getStaffRestaurant = async () => {
    try {
      const resp = await axios.get(`${url}/api/staff/getrestaurant`, {
        withCredentials: true,
      });
      dispatch(setRestaurant(resp?.data));
    } catch (error) {
      console.error(error);
      if (error.response.data.message) {
        dispatch(setStatus(error.response.data.message));
      }
    }
  };

  useEffect(() => {
    getStaffRestaurant();
  }, []);

  if (status === "loading") return <PageLoaders />;
  if (status === "Waiting For Admin to Assign Role") {
    return (
      <div className="flex items-center justify-center h-[70vh] bg-gray-100">
        <div className="text-center p-8 bg-white shadow-lg rounded-lg">
          <p className="text-2xl font-bold text-gray-800 mb-4">{status}</p>
          <p className="text-gray-600 mb-6">
            Please wait while the admin assigns your role.
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-lg font-semibold text-blue-600 border-b-2 border-blue-600 pb-1 hover:border-blue-800 hover:text-blue-800 transition duration-200"
          >
            Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-200 min-h-screen">
      <img
        src={restaurant?.imageUrl}
        alt="Restaurant"
        className="w-full h-[25rem] object-cover blur-[3px]"
      />
      <div className="absolute top-16 flex flex-col justify-center items-center text-white bg-[#34323288] bg-opacity-50 z-10 p-5">
        <h3 className="text-3xl font-bold">{restaurant?.name}</h3>
        <p className="text-2xl">{restaurant?.address}</p>
        <p className="text-lg text-center">{restaurant?.about}</p>
      </div>

      <form
        className="mt-4 p-6 bg-white rounded-lg shadow-lg z-20 relative max-w-md mx-auto"
        onSubmit={handleDishSubmission}
        encType="multipart/form-data"
      >
        <h2 className="text-xl font-semibold text-[#333333] mb-4">
          Add a New Dish
        </h2>

        {/* Input fields */}
        <div className="mb-4">
          <label className="block text-[#555555] mb-1">Dish Name</label>
          <input
            type="text"
            name="dishname"
            className="w-full p-3 border border-[#dddddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
            placeholder="Enter dish name"
            required
            onChange={(e) =>
              dispatch(setDish({ name: e.target.name, value: e.target.value }))
            }
            value={dish.dishname || ""}
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#555555] mb-1">Category</label>
          <input
            type="text"
            name="category"
            className="w-full p-3 border border-[#dddddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
            placeholder="Enter category"
            required
            onChange={(e) =>
              dispatch(setDish({ name: e.target.name, value: e.target.value }))
            }
            value={dish.category || ""}
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#555555] mb-1">Cuisine</label>
          <input
            type="text"
            name="cuisine"
            className="w-full p-3 border border-[#dddddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
            placeholder="Enter cuisine"
            required
            onChange={(e) =>
              dispatch(setDish({ name: e.target.name, value: e.target.value }))
            }
            value={dish.cuisine || ""}
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#555555] mb-1">Dish Details</label>
          <textarea
            className="w-full p-3 border border-[#dddddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] resize-none"
            placeholder="Enter dish details"
            name="dishdetail"
            onChange={(e) =>
              dispatch(setDish({ name: e.target.name, value: e.target.value }))
            }
            value={dish.dishdetail || ""}
            rows="4"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-[#555555] mb-1">Price</label>
          <input
            type="number"
            name="price"
            className="w-full p-3 border border-[#dddddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
            placeholder="Enter price"
            onChange={(e) =>
              dispatch(setDish({ name: e.target.name, value: e.target.value }))
            }
            value={dish.price || ""}
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#555555] mb-1">Discount</label>
          <input
            type="number"
            name="discount"
            className="w-full p-3 border border-[#dddddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
            placeholder="Enter discount"
            onChange={(e) =>
              dispatch(setDish({ name: e.target.name, value: e.target.value }))
            }
            value={dish.discount || ""}
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#555555] mb-1">Dish Image</label>
          <input
            type="file"
            className="w-full p-3 border border-[#dddddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
            onChange={handleImageChange}
            accept="image/*"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-full rounded-lg"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full p-3 border-b-2 border-[#007BFF] text-[#007BFF] rounded-b hover:border-blue-600 hover:text-blue-600 transition duration-200 flex items-center justify-center"
        >
          <FaPlus className="mr-2" /> Add Dish
        </button>
      </form>

      {formSubmitted && apiStatus === "success" && (
        <div className="mt-6 max-w-md mx-auto bg-green-200 text-green-700 p-4 rounded-lg">
          <p>Category Added Successfully!</p>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => setFormSubmitted(false)}
              className="text-sm font-semibold text-green-600 hover:underline"
            >
              Add Another
            </button>
            <Link
              to="/"
              className="text-sm font-semibold text-green-600 hover:underline"
            >
              <FaHome className="inline mr-1" /> Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCategory;
