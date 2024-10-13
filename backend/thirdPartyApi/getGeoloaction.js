const axios = require("axios");

async function getGeoloaction(address) {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        address.trim()
      )}&format=json&limit=1`
    );
    if (response.data.length === 0) {
      throw new Error("No location found for the given address");
    }
    const { lat, lon } = response.data[0];
    return { latitude: lat, longitude: lon };
  } catch (error) {
    console.error("Error fetching geolocation:", error);
    throw new Error("Failed to get geolocation");
  }
}
module.exports = getGeoloaction;
