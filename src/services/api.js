// api.js
const BACKEND_URL = 'https://api.laposte.fr/geolocalisation/v1';

export const searchAddresses = async (query) => {
  try {
    const response = await fetch(`${BACKEND_URL}/adresses?q=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAddressDetails = async (code) => {
  try {
    const response = await fetch(`${BACKEND_URL}/adresses/${code}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
