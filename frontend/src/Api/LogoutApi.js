import axios from "axios";

export async function LogOut() {
  const url = import.meta.env.VITE_BACKEND_API;
  try {
    const removeToken = await axios.post(`${url}/api/logout`, null, {
      withCredentials: true,
    });
    return removeToken.data;
  } catch (error) {
    console.log(error);
  }
}
