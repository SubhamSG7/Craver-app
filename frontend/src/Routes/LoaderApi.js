import axios from "axios";

export async function fetchRestaurants() {
  let response = await axios.get(`http://localhost:3000/api/get/restaurants`);
  return response.data;
}
