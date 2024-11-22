import axios from "axios";

export async function fetchRestaurants() {
  const url = import.meta.env.VITE_BACKEND_API;
  let response = await axios.get(`${url}/api/get/restaurants`);
  return response.data;
}
