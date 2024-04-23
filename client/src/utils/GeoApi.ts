import axios from 'axios';

const fetchNearestStations = async (lat: number = 31.7917, lng: number = -7.0926) => {
  const defaultLocale = 'fr_MA';
  const defaultFormat = 'json';
  const defaultDrivingDistances = true;
  const defaultLimit = 50;

  const apiUrl = `https://cors-anywhere.herokuapp.com/https://shellretaillocator.geoapp.me/api/v2/locations/nearest_to?lat=${lat}&lng=${lng}&limit=${defaultLimit}&locale=${defaultLocale}&format=${defaultFormat}&driving_distances=${defaultDrivingDistances}`;
  
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default fetchNearestStations;
